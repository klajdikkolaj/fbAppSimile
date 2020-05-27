import React  from 'react'
import { Menu, Button, Container } from "semantic-ui-react";
import {NavLink} from "react-router-dom";



const NavBar:React.FC = () => {
    
    return(
    <Menu fixed={"top"} inverted>
        <Container>
        <Menu.Item header={true} as={NavLink} exact to='/'>
            <img style={{marginRight:"10px"}} src={"assets/logo.png"} alt={'logo'}/>Social App</Menu.Item>
        <Menu.Item name='Activities' as={NavLink}  to='/activities' />
        <Menu.Item ><Button positive content={"Create Activity"} as={NavLink}  to='/createActivity'/> </Menu.Item>
        </Container>
    </Menu>
   
    )
}

export default NavBar