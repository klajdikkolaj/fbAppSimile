import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import { IActivity } from "../models/activity";
import agent from "../API/agent";
import { history } from '../..'
import { toast } from "react-toastify";
import { RootStore } from "./rootStore";

configure({enforceActions: 'always'})

export default class ActivityStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

    }

    @observable activityRegistry = new Map();
    @observable loadingInitial = false;
    @observable activity: IActivity | null = null;
    @observable submitting = false;
    @observable target = '';


    @computed get activitiesByDate() {
        return this.groupActivitiesByDates(Array.from(this.activityRegistry.values()))
    }

    @action loadActivities = async () => {
        try {
            this.loadingInitial = true
            const activities = await agent.Activities.list();
            runInAction('load activities', () => {
                    activities.forEach(activity => {
                        activity.date = new Date(activity.date!)
                        this.activityRegistry.set(activity.id, activity)
                    })
                    this.loadingInitial = false
                }
            )
            console.log(this.groupActivitiesByDates(activities))

        } catch (error) {
            runInAction('error loading', () => {
                this.loadingInitial = false
            })
            console.log(error)

        }
    }

    groupActivitiesByDates(activities: IActivity[]) {
        const sortedActivities = activities.sort((a, b) => a.date!.getTime() - b.date!.getTime());
        return Object.entries(sortedActivities.reduce((activities, activity) => {
            const date = activity.date!.toISOString().split('T')[0];
            activities[date] = activities[date] ? [...activities[date], activity] : [activity]
            return activities
        }, {} as { [key: string]: IActivity[] }))
    }

    @action loadActivity = async (id: string) => {
        let activity = this.getActivity(id);
        if (activity) {
            this.activity = activity;
            return activity;
        } else {
            this.loadingInitial = true;

            try {
                activity = await agent.Activities.details(id);
                runInAction('loading activity', () => {
                    activity.date = new Date(activity.date)
                    this.activityRegistry.set(activity.id, activity)
                    this.activity = activity
                    this.loadingInitial = false
                })
                return activity;
            } catch (error) {
                runInAction('error loading activity', () => {
                    this.loadingInitial = false
                })
                console.log(error)
            }
        }
    }

    getActivity = (id: string) => {
        return this.activityRegistry.get(id)
    }

    @action clearActivity = () => {
        this.activity = null;
    }


    @action createActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.create(activity);
            runInAction('create an activity', () => {
                this.activityRegistry.set(activity.id, activity);
                this.submitting = false
            })
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction('error reating an activity', () => {
                this.submitting = false;
            })
            toast.error('problem submitting form')
            console.log(error.response)
        }
    }


    @action editActivity = async (activity: IActivity) => {
        this.submitting = true;
        try {
            await agent.Activities.update(activity);
            runInAction('edit an activity', () => {
                this.activityRegistry.set(activity.id, activity)
                this.activity = activity;
                this.submitting = false
            })
            history.push(`/activities/${activity.id}`)
        } catch (error) {
            runInAction('error editing activity', () => {
                this.submitting = false
            })
            toast.error('problem submitting form')
            console.log(error.response)

        }
    }

    @action deleteActivity = async (event: SyntheticEvent<HTMLButtonElement>, id: string) => {
        this.submitting = true;
        this.target = event.currentTarget.name
        try {
            await agent.Activities.delete(id);
            runInAction('delete an activity', () => {
                this.activityRegistry.delete(id);
                this.submitting = false
                this.target = '';
            })

        } catch (error) {
            runInAction('error deleting activity', () => {
                this.target = '';
                this.submitting = false
            })
            console.log(error)
        }
    }


}

