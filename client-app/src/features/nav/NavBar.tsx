import React from 'react'
import { Menu, Button, Container } from "semantic-ui-react";

interface IProps {
    handleEditMode:() =>void
}


const NavBar:React.FC<IProps> = ({handleEditMode}) => {
    return(
    <Menu fixed={"top"} inverted>
        <Container>
        <Menu.Item header={true}><img style={{marginRight:"10px"}} src={"assets/logo.png"} alt="logo" />Social App</Menu.Item>
        <Menu.Item name='Activities'/>
        <Menu.Item ><Button positive content={"Create Activity"} onClick={handleEditMode}/> </Menu.Item>
        </Container>
    </Menu>
   
    )
}

export default NavBar