export interface IUser {
    diplayName: string;
    username: string;
    token: string;
    image?: null;
}

export interface IUserFormValues {
    diplayName: string;
    email: string;
    password: string;
    username: string;
}