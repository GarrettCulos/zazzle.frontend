
export interface User {
    id: string,
    fullName: string,
    firstName: string,
    lastName: string,
    userName: string,
    createdAt:Date,
    updatedAt: Date,
    metadata: {
        [ s: string]: any
    }
}

export interface UserErrors {
    error: string;
}