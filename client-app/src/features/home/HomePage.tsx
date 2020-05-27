import React from 'react';
import {Container} from "semantic-ui-react";
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Container style={{marginTop:'7em'}}>
            <h1>Home Page</h1>
            <Link to={'/activities'}>Go to activities</Link>
        </Container>
    );
};

export default HomePage;
