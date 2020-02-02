export interface User {
  id?: string;
  fullName?: string;
  firstName?: string;
  lastName?: string;
  userName: string;
  createdAt?: Date;
  updatedAt?: Date;
  avatar?: {
    width?: number;
    height?: number;
    url: string;
  };
  metadata?: {
    [s: string]: any;
  };
}
