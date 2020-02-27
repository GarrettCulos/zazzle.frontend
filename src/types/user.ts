export interface User {
  id?: string;
  userName?: string;
  userIcon: string;
  createdAt?: Date;
  updatedAt?: Date;
  favorites: { projectId: string }[];
  myProjects: any[];
  metadata?: {
    [s: string]: any;
  };
}
