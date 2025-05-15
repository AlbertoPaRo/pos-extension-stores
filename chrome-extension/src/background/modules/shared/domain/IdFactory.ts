export enum Flags {
  NEW_ENTITY = 'NEW_ENTITY',
}

export const IdFactory = {
  generate: () => `${Flags.NEW_ENTITY}`,
  generateUnique: () => Math.random().toString(36).slice(2),
};
