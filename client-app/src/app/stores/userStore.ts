import { observable, computed, action, runInAction } from "mobx";
import { IUser, IUserFormValues } from "../models/user";
import agent from "../API/agent";
import { RootStore } from "./rootStore";
import {history} from '../..'


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
            this.rootStore.commonStore.setToken(user.token)
            history.push('/activities')
            this.rootStore.modalStore.closeModal()
        } catch (error) {
           throw error.response;
        }
    }

    @action register = async (values:IUserFormValues)=>{
        try {
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            history.push('/activities')
            this.rootStore.modalStore.closeModal();

        }catch (error) {
            throw error
        }
    }
    
    @action getUser = async () =>{
        try {
            const user = await agent.User.current();
            runInAction(()=>{
                this.user = user;
            })
        }catch (error) {
            console.log(error) 
        }
    }
    
    @action logout = ()=>{
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/')
    }
}