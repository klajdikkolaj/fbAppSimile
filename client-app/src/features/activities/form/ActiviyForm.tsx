import React from 'react';
import PropTypes from 'prop-types';
import {Segment, Form} from 'semantic-ui-react';

interface IProps {
    setEditMode: (editMode: boolean) => void

}

const ActivityForm: React.FC<IProps> = ({setEditMode}) => {
    return (
        <Segment>
            {setEditMode &&
            <Form>
                <Form.Input type={'string'} placeholder={'Title'}/>
                <Form.TextArea rows={2} type={'string'} placeholder={'Description'}/>
                <Form.Input type={'string'} placeholder={'Category'}/>
                <Form.Input type={'date'} placeholder={'Date'}/>
                <Form.Input type={'string'} placeholder={'City'}/>
                <Form.Input type={'string'} placeholder={'Venue'}/>
            </Form>
            }

        </Segment>
    );
};


export default ActivityForm;
