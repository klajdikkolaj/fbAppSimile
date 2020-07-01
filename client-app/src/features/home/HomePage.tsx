import React, { useContext, Fragment } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../app/stores/rootStore';
import LoginForm from '../user/loginForm';
import RegisterForm from '../user/registerForm';


const HomePage = () => {


    const rootStore = useContext(RootStoreContext);
    const {isloggedIn} = rootStore.userStore;
    const {openMOdal} = rootStore.modalStore;

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBottom: 12}}/>
                    Reactivities
                </Header>
                {isloggedIn ?
                    <Fragment>
                        <Header as='h2' inverted content='Welcome to Reactivities'/>
                        <Button as={Link} to='/activities' size='huge' inverted>
                            Take me to the activities!
                        </Button>
                    </Fragment> :
                    <Fragment>
                        <Button onClick={()=>openMOdal(<LoginForm/>)} size='huge' inverted>
                            Login
                        </Button>
                        <Button onClick={()=>openMOdal(<RegisterForm/>)} size='huge' inverted>
                            Register
                        </Button>
                    </Fragment>
                    
                }
            </Container>
        </Segment>

    )
};

export default HomePage;