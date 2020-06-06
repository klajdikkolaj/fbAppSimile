import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid, GridColumn } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import ActivityStore from '../../../app/stores/activityStore'
import { v4 as uuid } from 'uuid'
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import { Form as FinalForm, Field } from 'react-final-form'
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectInput from '../../../app/common/form/SelectInput';
import { category } from '../../../app/common/options/categoryOptions';
import DateInput from '../../../app/common/form/DateInput';
import { dateTimeCombined } from '../../../app/common/util/util';
import { combineValidators, composeValidators, hasLengthGreaterThan, isRequired } from 'revalidate'

const validate = combineValidators({
    title: isRequired('title is required'),
    category: isRequired('Category'),
    description: composeValidators(
        isRequired('Description'),
        hasLengthGreaterThan(4)({message: 'must be greater than 4 letters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')

})

interface DetailProps {
    id: string

}

const ActivityForm: React.FC<RouteComponentProps<DetailProps>> = ({history, match}) => {
    const activityStore = useContext(ActivityStore);
    const {submitting, createActivity, editActivity, loadActivity} = activityStore
    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (match.params.id) {
            setLoading(true)
            loadActivity(match.params.id).then((activity) => setActivity(new ActivityFormValues(activity))).finally(() => setLoading(false));
        }

    }, [match.params.id, loadActivity,])


    const handleSubmitFinalForm = (values: any) => {
        const dateAndTime = dateTimeCombined(values.date, values.time);
        const {date, time, ...activity} = values;
        activity.date = dateAndTime;
        if (activity.id) {
            return editActivity(activity)
        } else {
            let newActivity = {
                ...activity,
                id: uuid()
            }
            createActivity(newActivity)
        }

        console.log(activity)
    }
   

    return (
        <Grid>
            <GridColumn width={10}>
                <Segment clearing>
                    <FinalForm
                        validate={validate}
                        initialValues={activity}
                        onSubmit={handleSubmitFinalForm}
                        render={({handleSubmit}) => (
                            <Form key={activity.id}
                                  onSubmit={handleSubmit}
                                  loading={loading}
                            >
                                <Field
                                    type={'string'}
                                    name='title'
                                    placeholder={'Title'}
                                    value={activity.title}
                                    component={TextInput}
                                />
                                <Field
                                    rows={3}
                                    name='description'
                                    component={TextAreaInput}
                                    placeholder={'Description'}
                                    value={activity.description}
                                />
                                <Field
                                    options={category}
                                    name='category'
                                    component={SelectInput}
                                    placeholder={'Category'}
                                    value={activity.category}
                                />
                                <Form.Group widths={"equal"}>
                                    <Field
                                        name='date'
                                        date={true}
                                        component={DateInput}
                                        placeholder={'Date'}
                                        value={activity.date}
                                    />
                                    <Field
                                        name='time'
                                        time={true}
                                        component={DateInput}
                                        placeholder={'Time'}
                                        value={activity.time}
                                    />

                                </Form.Group>

                                <Field
                                    type={'string'}
                                    name='city'
                                    component={TextInput}
                                    placeholder={'City'}
                                    value={activity.city}
                                />
                                <Field
                                    type={'string'}
                                    name='venue'
                                    component={TextInput}
                                    placeholder={'Venue'}
                                    value={activity.venue}
                                />
                                <Button.Group widths={2}>
                                    <Button color={'green'} content={'Save'} type="submit" loading={submitting}
                                            disabled={loading}/>
                                    <Button type='button' content={'Cancel'}
                                            onClick={() => activity.id ? history.push(`/activities/${activity.id}`) : history.push('/activities')}
                                            disabled={loading}/>
                                </Button.Group>
                            </Form>
                        )}/>

                </Segment>
            </GridColumn>
        </Grid>
    );

}


export default observer(ActivityForm);
