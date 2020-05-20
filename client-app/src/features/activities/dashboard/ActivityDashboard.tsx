import React, {SyntheticEvent} from 'react';
import {Container, Grid, List} from 'semantic-ui-react';
import ActivityList from './ActivityList';
import {IActivity} from '../../../app/models/activity';
import ActivityDetails from '../details/ActivityDetails';
import ActivityForm from '../form/ActiviyForm';


interface IProps {
    activities: IActivity[];
    selectActivity: (id: string) => void
    selectedActivity: IActivity;
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    setSelectedActivity: (IActivity: null) => void
    createActivity: (activity: IActivity) => void
    editActivity: (activity: IActivity) => void
    deleteActivity: (even: SyntheticEvent<HTMLButtonElement>, id: string) => void
    submitter: boolean
    target: string

}

const ActivityDashboard: React.FC<IProps> = ({
                                                 activities,
                                                 selectActivity,
                                                 selectedActivity,
                                                 setSelectedActivity,
                                                 setEditMode,
                                                 editMode,
                                                 createActivity,
                                                 editActivity,
                                                 deleteActivity,
                                                 submitter,
                                                 target
                                             }) => {
    return (
        <div>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityList activities={activities} theActivity={selectActivity} deleteActivity={deleteActivity}
                                  submitter={submitter} target={target}/>
                </Grid.Column>
                <Grid.Column width={6}>{selectedActivity && !editMode &&
                <ActivityDetails activities={activities} activity={selectedActivity} setEditMode={setEditMode}
                                 setSelectedActivity={setSelectedActivity}/>}
                    {editMode &&
                    <ActivityForm key={selectedActivity && selectedActivity.id || 0}
                                  setEditMode={setEditMode}
                                  activity={selectedActivity}
                                  createActivity={createActivity}
                                  editActivity={editActivity}
                                  submitter={submitter}

                    />}
                </Grid.Column>
            </Grid>
        </div>
    );
};

export default ActivityDashboard;
