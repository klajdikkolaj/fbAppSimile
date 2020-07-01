import { RootStore } from "./rootStore";
import { observable, action, reaction } from "mobx";

export default class CommonStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;


        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt')
                }

            }
        )
    }

    //we need a token and to know if app is loaded

    @observable token: string | null = window.localStorage.getItem('jwt');
    @observable appLoaded = false;

    //setToken, we save it in localstorage so we can get access to it easily
    @action setToken = (token: string | null) => {
        window.localStorage.setItem('jwt', token!);
        this.token = token;
    }

    @action setAppLoaded = () => {
        this.appLoaded = true;
    }


}