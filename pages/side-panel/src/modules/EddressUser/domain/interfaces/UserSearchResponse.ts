import { User } from './User';

export interface UserSearchResponse {
  message: string;
  errorCode: number;
  list: User[];
  pages: number;
  recordCount: number;
}
