export interface IUser {
    displayName: string;
    username: string;
    token: string;
    image?: null;
}

export interface IUserFormValues {
    displayName: string;
    email: string;
    password: string;
    username: string;
}