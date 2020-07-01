import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form'
import { Button, Form, Header } from 'semantic-ui-react';
import { EMPTY_ARRAY } from "mobx/lib/utils/utils";
import TextInput from '../../app/common/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { IUserFormValues } from '../../app/models/user';
import { observer } from 'mobx-react-lite';
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import { Dir } from "fs";
import ErrorMessage from '../../app/common/form/ErrorMessage';

const validate = combineValidators({
    username: isRequired('username'),
    displayName: isRequired('Display Name'),
    email: isRequired('email'),
    password: isRequired('Password')
})

const RegisterForm = () => {
    const routeStore = useContext(RootStoreContext)
    const {register} = routeStore.userStore
    return (
        <FinalForm onSubmit={(values: IUserFormValues) => register(values).catch(error => ({
            [FORM_ERROR]: error
        }))}
                   validate={validate}
                   render={({
                                handleSubmit,
                                submitting,
                                submitError,
                                invalid,
                                pristine,
                                dirtySinceLastSubmit,
                                form
                            }) => (

                       <Form onSubmit={handleSubmit} error>
                           <Header as={'h2'} content='Sign Up to reactivities' color={'teal'} textAlign={'center'}/>
                           <Field name={'username'} component={TextInput} placeholder='UserName'/>
                           <Field name={'displayName'} component={TextInput} placeholder='Display Name'/>
                           <Field name={'email'} component={TextInput} placeholder='Email'/>
                           <Field name='password'
                                  component={TextInput}
                                  placeholder='Password'
                                  type='password'
                           />
                           {submitError && !dirtySinceLastSubmit && (
                               <ErrorMessage error={submitError}
                               />
                           )}
                           <br/>
                           <Button
                               disabled={(invalid && !dirtySinceLastSubmit) || pristine}
                               loading={submitting}
                               color={"teal"}
                               content='Register'
                               fluid
                           />
                           {/*/**/}
                           {/*<pre>{JSON.stringify(form.getState(), null, 2)}</pre>*/}

                       </Form>
                   )}
        />
    );
};

export default observer(RegisterForm);
