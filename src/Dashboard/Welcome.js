import React from 'react';
import { Link } from 'react-router-dom';
import { WelcomeView, Button } from './styles';

export default ({ setCurrentView }) => {

    return (
        <WelcomeView>
            <h1>Welcome to PotLuck Planner!</h1>
            <p>Begin planning your own personalized potluck!</p>
            <Link style={{ textDecoration: 'none' }} onClick={() => setCurrentView('create')}>
                <Button>
                    <p>Create Potluck</p>
                </Button>
            </Link>
        </WelcomeView>
    );
}