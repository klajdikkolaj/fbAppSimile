import React, {useState, useEffect, Fragment, SyntheticEvent} from 'react';
import axios from 'axios'
import {Header, Icon, List, Container} from 'semantic-ui-react'
import {IActivity} from '../models/activity';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import agent from '../API/agent';
import LoadingComponent from './LoadingComponent';


const App = () => {
    const [activities, setActivities] = useState<IActivity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(null)
    const [editMode, setEditMode] = useState(false)
    const [loading, setLoading] = useState(true)
    const[submitter, setSubmitter] = useState(false)
    const[target,setTarget] = useState('')


    const handleActivity = (id: string) => {
        agent.Activities.list().then(() => {
            setSelectedActivity(activities.filter(a => a.id === id)[0])
            setEditMode(false);
        })
    }

    const handleEditMode = () => {
        setSelectedActivity(null)
        setEditMode(true)
    }

    const handleCreateActivity = (activity: IActivity) => {
        setSubmitter(true);
        agent.Activities.create(activity).then(() => {
                setActivities([...activities, activity])
                setSelectedActivity(activity)
                setEditMode(false)
            }
        ).then(()=>setSubmitter(false))
    }
    const handleEditActivity = (activity: IActivity) => {
        setSubmitter(true);
        agent.Activities.update(activity).then(() => {
            setActivities([...activities.filter(oldActivity => oldActivity.id !== activity.id), activity])
            setSelectedActivity(activity)
            setEditMode(false)
        }).then(()=> setSubmitter(false))
    }
    const handleDeleteActivity = (event: SyntheticEvent<HTMLButtonElement>,id: string) => {
        setSubmitter(true);
        setTarget(event.currentTarget.name)
        agent.Activities.delete(id).then(() => {
            setActivities([...activities.filter(oldActivity => oldActivity.id !== id)])
        }).then(()=>setSubmitter(false))
    }
    
    useEffect(() => {
        agent.Activities.list()
            .then((response) => {
                let activities: IActivity[] = [];
                response.forEach(activity => {
                    activity.date = activity.date.split('.')[0]
                    activities.push(activity)
                })
                setActivities(activities)
            }).then(() => setLoading(false))
    }, [])

    if (loading) return <LoadingComponent content={("still loading")}/>

    return (
        <Fragment>
            <NavBar handleEditMode={handleEditMode}/>
            <Container style={{marginTop: '7em'}}>
                <ActivityDashboard
                    activities={activities}
                    selectActivity={handleActivity}
                    selectedActivity={selectedActivity!}
                    setSelectedActivity={setSelectedActivity}
                    editMode={editMode}
                    setEditMode={setEditMode}
                    createActivity={handleCreateActivity}
                    editActivity={handleEditActivity}
                    deleteActivity={handleDeleteActivity}
                    submitter={submitter}
                    target={target}
                    
                   

                />
            </Container>
        </Fragment>
    );
}

export default App;
