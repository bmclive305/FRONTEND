export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userRole: string;
}

export interface LoginUser {
    email: string;
    password: string;
}