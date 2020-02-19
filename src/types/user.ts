export interface User {
  id?: string;
  userName?: string;
  userIcon: string;
  createdAt?: Date;
  updatedAt?: Date;
  favorites: string[];
  myProjects: string[];
  metadata?: {
    [s: string]: any;
  };
}
