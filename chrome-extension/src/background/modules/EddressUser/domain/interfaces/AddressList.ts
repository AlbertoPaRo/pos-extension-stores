import { type Coordinates } from './Coordinates';
import { type Country } from './Country';

export interface AddressList {
  street: null | string;
  locality: string;
  country: Country | null;
  city: string | null;
  state: null | any;
  coordinates: Coordinates;
  building: null | string;
  unit: null | string;
  name: null;
  eddressCode: string;
  notes: string;
  uid: null;
  eddressId: null;
  buildingBlock: null;
  isVerified: null;
  addressFilled: null;
  verifiedOn: null;
  verifiedByUserUid: null;
  additionalInfo: null | string;
  updatedBy: null | string;
  updatedOn: number | null;
  postalCode: null | string;
  addressDetails: string;
  addressInfo: string;
  addressDetailInfo: string;
  addressDetailsWithoutRedundancy: string;
}
