import React, { useContext } from 'react'
import { Menu, Button, Image, Container, Dropdown } from "semantic-ui-react";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from '../../app/stores/rootStore';


const NavBar: React.FC = () => {


    const rootStore = useContext(RootStoreContext);
    const {logout, login, isloggedIn, user} = rootStore.userStore


    return (
        <Menu fixed={"top"} inverted>
            <Container>
                <Menu.Item header={true} as={NavLink} exact to='/'>
                    <img style={{marginRight: "10px"}} src={"assets/logo.png"} alt={'logo'}/>Social App</Menu.Item>
                <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                <Menu.Item><Button positive content={"Create Activity"} as={NavLink} to='/createActivity'/> </Menu.Item>
                {user &&
                <Menu.Item position='right'>
                    <Image avatar spaced='right' src={user.image || '/assets/user.png'}/>
                    <Dropdown pointing='top left' text={user.displayName}>
                        <Dropdown.Menu>
                            <Dropdown.Item as={Link} to={`/profile/username`} text='My profile' icon='user'/>
                            <Dropdown.Item onClick={logout} text='Logout' icon='power'/>
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>

                }
            </Container>
        </Menu>

    )
}

export default NavBar