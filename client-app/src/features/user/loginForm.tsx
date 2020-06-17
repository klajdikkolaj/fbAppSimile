import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form'
import { IUserFormValues } from '../../app/models/user';
import { Form, Button } from 'semantic-ui-react';
import TextInput from '../../app/common/form/TextInput';
import { RootStore, RootStoreContext } from '../../app/stores/rootStore';
import { combineValidators, isRequired } from 'revalidate';

const validation = combineValidators({
    email :isRequired('email'),
    password :isRequired('Password')
}) 

const LoginForm = () => {
    
    const rootStore = useContext(RootStoreContext);
    const {login} = rootStore.userStore;
    return (
        <FinalForm onSubmit={(values: IUserFormValues) => login(values)}
                   render={({handleSubmit, form}) => (
                       <Form onSubmit={handleSubmit}>
                           <Field name="email" placeholder="Email" component={TextInput}/>
                           <Field name="password" placeholder="password" type="password" component={TextInput}/>
                           <Button positive content={"Login"}/>
                           <pre>{JSON.stringify(form.getState,null,2)}</pre>
                       </Form>
                   )}></FinalForm>
    );
};

export default LoginForm;
