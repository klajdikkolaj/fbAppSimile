import React from 'react';
import {Container, Grid, List} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import { IActivity } from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActiviyForm';



interface IProps {
    activities : IActivity[];
    selectActivity:(id:string) =>void
    selectedActivity:IActivity;
    editMode:boolean
    setEditMode:(editMode:boolean)=>void
    setSelectedActivity:(IActivity:null)=>void
    
}

const ActivityDashboard:React.FC<IProps>= ({activities, selectActivity, selectedActivity,setSelectedActivity, setEditMode, editMode}) => {
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                   <ActivityList activities={activities} theActivity = {selectActivity}/>
                </Grid.Column>
                <Grid.Column width={6}>{selectedActivity && !editMode && 
                    <ActivityDetails activities={activities} activity={selectedActivity} setEditMode={setEditMode} setSelectedActivity={setSelectedActivity} />}
                    {editMode&&
                    <ActivityForm setEditMode={setEditMode} />}
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default ActivityDashboard;
