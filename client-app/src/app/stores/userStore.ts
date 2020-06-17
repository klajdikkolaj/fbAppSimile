import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../API/agent";
import { RootStore } from "./rootStore";


export default class UserStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user: IUser | null = null;

    @computed get isloggedIn() {
        return !!this.user
    }

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction("Login", () => {
                this.user = user;
            })
            console.log(user)
        } catch (error) {
           throw error.response;
        }
    }
}