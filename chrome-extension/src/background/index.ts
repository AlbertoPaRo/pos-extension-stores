import * as cheerio from 'cheerio';
import { handleTabUpdate } from './modules/dom-interaction/application/tabsListener';
import { createIndexedDbRepository } from './modules/indexedDb/infrastructure/indexedrepositoryFactory';
import { createFetchContactUseCase } from './modules/indexedDb/application/fetchContactUseCase';
import { injectScriptUseCase } from './modules/dom-interaction/application/injectScriptUseCase';

const fetchedUids = new Set<string>();

const contactRepository = createIndexedDbRepository('BimsExtensionDB', 'Contacts');
const fetchContactUseCase = createFetchContactUseCase(contactRepository);
const handleMessage = async (
  message: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response?: any) => void,
) => {
  if (message.html && message.url) {
    const $ = cheerio.load(message.html);
    const uid = $('a[item_id]').attr('item_id') || null;
    const documentId = $('.contact-span').text().trim();
    if (uid) {
      console.log('>>>>>UID', uid);
      if (fetchedUids.has(uid)) {
        console.log(`UID ${uid} ya fue procesado. Evitando solicitud duplicada.`);
        return;
      }
      fetchedUids.add(uid);
      try {
        const contactData = await fetchContactUseCase(uid);
        if (!contactData) {
          console.warn(`No se encontró contacto para UID ${uid}`);
          sendResponse(null);
          return;
        }
        if (sender.tab?.id) {
          chrome.tabs.sendMessage(sender.tab.id, {
            type: 'HasEddressData',
            payload: contactData.code ? true : false,
          });
        }
        if (contactData.code) {
          contactData.documentId = documentId;
          sendResponse(contactData);
          return;
        }

        contactData.documentId = documentId;
        chrome.runtime.sendMessage({
          type: 'CONTACT_DATA',
          payload: contactData,
        });

        sendResponse(contactData);
        return;
      } catch (error) {
        console.error('Error al procesar el UID:', error);
        sendResponse(null);
      }
    } else {
      console.warn('No se encontró UID en el HTML.');
      sendResponse(null);
    }
  }
};

if (!chrome.runtime.onMessage.hasListener(handleMessage)) {
  chrome.runtime.onMessage.addListener(handleMessage);
}

chrome.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
  if (changeInfo.status === 'loading') {
    fetchedUids.clear();
    handleTabUpdate();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'openSidePanel') {
    chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
      if (tabs[0]?.id) {
        chrome.sidePanel.open({ tabId: tabs[0].id });
        await injectScriptUseCase();
      }
    });
  }
});

// import * as cheerio from "cheerio";
// import { handleTabUpdate } from "./modules/dom-interaction/application/tabsListener";
// import { createIndexedDbRepository } from "./modules/indexedDb/infrastructure/indexedrepositoryFactory";
// import { createFetchContactUseCase } from "./modules/indexedDb/application/fetchContactUseCase";

// const fetchedUids = new Set<string>();

// const contactRepository = createIndexedDbRepository("BimsExtensionDB", "Contacts");
// const fetchContactUseCase = createFetchContactUseCase(contactRepository);

// const handleMessage = async (
//   message: any,
//   sender: chrome.runtime.MessageSender,
//   sendResponse: (response?: any) => void
// ) => {
//   if (message.html && message.url) {
//     const $ = cheerio.load(message.html);
//     const uid = $("a[item_id]").attr("item_id") || null;
//     const documentId = $(".contact-span").text();
//     console.log(">>>>>document",documentId)
//     console.log(">>>>>uid",uid)

//     if (uid) {
//       if (fetchedUids.has(uid)) {
//         console.log(`UID ${uid} ya fue procesado. Evitando solicitud duplicada.`);
//         return;
//       }
//       fetchedUids.add(uid);
//       try {
//         const contactData = await fetchContactUseCase(uid);
//         if (!contactData) {
//           console.warn(`No se encontró contacto para UID ${uid}`);
//           sendResponse(null);
//           return;
//         }

//         if (sender.tab?.id) {
//           chrome.tabs.sendMessage(sender.tab.id, {
//             type: "HasEddressData",
//             payload: contactData.code ? true : false,
//           });
//         }

//         contactData.documentId = documentId;
//         if (contactData.code) {
//           sendResponse(contactData);
//           return;
//         }

//         chrome.runtime.sendMessage({
//           type: "CONTACT_DATA",
//           payload: contactData,
//         });
//         console.log(">>>>>>CONTTT",contactData)

//         sendResponse(contactData);
//       } catch (error) {
//         console.error("Error al procesar el UID:", error);
//         sendResponse(null);
//       }
//     } else {
//       console.warn("No se encontró UID en el HTML.");
//       sendResponse(null);
//     }
//   }
// };

// if (!chrome.runtime.onMessage.hasListener(handleMessage)) {
//   chrome.runtime.onMessage.addListener(handleMessage);
// }

// chrome.tabs.onUpdated.addListener((_tabId, changeInfo, _tab) => {
//   if (changeInfo.status === "loading") {
//     fetchedUids.clear();
//     handleTabUpdate();
//   }
// });

// chrome.runtime.onMessage.addListener((request, _sender, _sendResponse) => {
//   if (request.action === "openSidePanel") {
//     chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
//       if (tabs[0]?.id) {
//         chrome.sidePanel.open({ tabId: tabs[0].id });
//       }
//     });
//   }

//   if (request.action === "extractContactFromDOM") {
//     chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//       const tab = tabs[0];
//       if (!tab?.id) return;

//       chrome.scripting.executeScript({
//         target: { tabId: tab.id },
//         func: () => {
//           // 🟡 Esta función se ejecuta en el contexto de la página web (bims.app)
//           const contactAnchor = document.querySelector("a[item_id]");
//           const documentSpan = document.querySelector(".contact-span");

//           if (contactAnchor) {
//             chrome.runtime.sendMessage({
//               html: contactAnchor.outerHTML + (documentSpan?.outerHTML ?? ""),
//               url: window.location.href,
//             });
//           } else {
//             console.warn("No se encontró elemento de contacto");
//           }
//         },
//       });
//     });
//   }
// });
