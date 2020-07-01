import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form'
import { IUserFormValues } from '../../app/models/user';
import { Form, Button, Label } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStore, RootStoreContext } from '../../app/stores/rootStore';
import { combineValidators, isRequired } from 'revalidate';
import { FORM_ERROR } from 'final-form';
import { observer } from 'mobx-react-lite';

const validation = combineValidators({
    email: isRequired('email'),
    password: isRequired('Password')
})

const LoginForm = () => {

    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
    return (
        <FinalForm onSubmit={(values: IUserFormValues) => login(values).catch(error => ({
            [FORM_ERROR]: error
        }))}
                   render={({handleSubmit, 
                                form, 
                                pristine,
                                dirtySinceLastSubmit,
                                submitError,
                                submitting,
                                invalid}) => (
                       <Form onSubmit={handleSubmit}>
                           <Field name="email" placeholder="Email" component={TextInput}/>
                           <Field name="password" placeholder="password" type="password" component={TextInput}/>
                           {submitError && !dirtySinceLastSubmit &&
                           <Label color={"red"} content={submitError.statusText}/>
                           }
                           <br/>
                           <Button positive
                                   content={"Login"}
                                   disabled={invalid && !dirtySinceLastSubmit || pristine}
                                   loading={submitting}
                           />
                           {/*<pre>{JSON.stringify(form.getState(), null, 2)}</pre>*/}
                       </Form>
                   )}></FinalForm>
    );
};

export default observer(LoginForm);
