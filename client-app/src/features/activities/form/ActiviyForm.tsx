import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, GridColumn } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';

interface DetailProps {
    id: string

}

const ActivityForm: React.FC<RouteComponentProps<DetailProps>> = ({history, match}) => {
    const activityStore = useContext(ActivityStore);
    const {submitting, clearActivity, createActivity, editActivity, loadActivity, loadingInitial, activity: initialFormState} = activityStore
    const [activity, setActivity] = useState<IActivity>({
        id: '',
        title: '',
        description: '',
        category: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (match.params.id && activity.id.length === 0) {
            loadActivity(match.params.id).then(() => initialFormState && setActivity(initialFormState))
        }
        return (() => {
            clearActivity()
        })

    }, [initialFormState, createActivity, loadingInitial, match.params.id, activity.id.length, loadActivity, clearActivity])


    const handleSubmit = () => {
        if (activity.id.length !== 0) {
            return editActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        } else {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        }
    }


    const handleInputChange = (event: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.currentTarget
        setActivity({...activity, [name]: value})
    }

    return (
        <Grid>
            <GridColumn width={10}>
                <Segment>
                    <Form key={activity.id} onSubmit={handleSubmit}>
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
                            <Button color={'green'} content={'Save'} type="submit" loading={submitting}/>
                            <Button type='button' content={'Cancel'} onClick={() => history.push('/activities')}/>
                        </Button.Group>
                    </Form>
                </Segment>
            </GridColumn>
        </Grid>
    );

}


export default observer(ActivityForm);
