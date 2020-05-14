import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';

interface IProps {
    activities:IActivity[]
    activity:IActivity;
    setEditMode:(editMode:boolean)=>void
    setSelectedActivity: (IActivity:null)=>void
}

const ActivityDetails:React.FC<IProps> = ({activities, activity,setEditMode}) => {
    return (
        <Card>
            <Image src ={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span >{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group divided widths={2}>
                    <Button basic={true} color={'blue'} content="Edit" onClick={()=>setEditMode(true)}></Button>
                    <Button basic={true} color='grey' content="Cancel"></Button>
                </Button.Group>
                
            </Card.Content>
        </Card>
    );
};

export default ActivityDetails;
