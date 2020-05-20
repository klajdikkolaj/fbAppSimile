import React, { SyntheticEvent } from 'react';
import {Item, Image, Button, Label, Segment} from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
    activities: IActivity[]
    theActivity: (id:string)=>void
    deleteActivity:(event: SyntheticEvent<HTMLButtonElement>,id:string) =>void
    submitter:boolean,
    target:string
}

const ActivityList: React.FC<IProps> = ({activities, theActivity, deleteActivity,submitter,target}) => {
    return (
        <Segment clearing={true}>
        <Item.Group divided={true}>
            {activities.map(activity =>
                <Item key={activity.id}>
                    <Item.Content >
                        <Item.Header as='a'>{activity.title}</Item.Header>
                        <Item.Meta>{activity.date}</Item.Meta>
                        <Item.Description>
                            <div>{activity.category}</div>
                            <div>{activity.city},{activity.venue}</div>
                        </Item.Description>
                        <Item.Extra>
                             <Button floated={'right'} content={'View'} color={'blue'} onClick={() =>theActivity(activity.id)} />
                            <Button floated={'right'} name = {activity.id} content={'Delete'} color={'red'} onClick={(e) =>deleteActivity(e,activity.id)} loading={target===activity.id && submitter}/>
                             <Label basic content={activity.category}/>
                        </Item.Extra>
                    </Item.Content>
                </Item>
            )}
        </Item.Group>
            </Segment>
            
    );
};

export default ActivityList;
