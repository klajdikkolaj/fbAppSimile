import React, {useState, FormEvent} from 'react';
import PropTypes from 'prop-types';
import {Segment, Form, Button} from 'semantic-ui-react';
import {IActivity} from '../../../app/models/activity';
import{v4 as uuid} from 'uuid'

interface IProps {
    setEditMode: (editMode: boolean) => void
    activity: IActivity
    createActivity: (activity: IActivity) => void
    editActivity: (activity: IActivity) => void
    submitter:boolean

}


const ActivityForm: React.FC<IProps> = ({setEditMode, activity: initalFormState, createActivity, editActivity,submitter}) => {
    const initialiseForm = () => {
        if (initalFormState) {
            return initalFormState
        } else {
            return {
                id: '',
                title: '',
                description: '',
                category: '',
                date: '',
                city: '',
                venue: ''
            }
        }

    }
    const [activity, setActivity] = useState<IActivity>(initialiseForm);
    
    const handleSubmit = () =>{
        if(activity.id.length !== 0){
            return editActivity(activity)
        }else{
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        }
    }

    

    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setActivity({...activity, [name]: value})
    }

    return (
        <Segment>
            
            <Form key = {activity.id} onSubmit={handleSubmit}>
                <Form.Input
                    type={'string'}
                    name='title'
                    onChange={handleInputChange}
                    placeholder={'Title'}
                    value={activity.title}
                />
                <Form.TextArea
                    rows={2}
                    name='description'
                    onChange={handleInputChange}
                    type={'string'}
                    placeholder={'Description'}
                    value={activity.description}
                />
                <Form.Input
                    type={'string'}
                    name='category'
                    onChange={handleInputChange}
                    placeholder={'Category'}
                    value={activity.category}
                />
                <Form.Input
                    type={'datetime-local'}
                    name='date'
                    onChange={handleInputChange}
                    placeholder={'Date'}
                    value={activity.date}
                />
                <Form.Input
                    type={'string'}
                    name='city'
                    onChange={handleInputChange}
                    placeholder={'City'}
                    value={activity.city}
                />
                <Form.Input
                    type={'string'}
                    name='venue'
                    onChange={handleInputChange}
                    placeholder={'Venue'}
                    value={activity.venue}
                />
                <Button.Group widths={2}>
                    <Button color={'green'} content={'Save'} type="submit" loading={submitter}/>
                    <Button type='button' content={'Cancel'} onClick={() => setEditMode(false)}/>
                </Button.Group>
            </Form>
            

        </Segment>
    );
    
}


export default ActivityForm;
