import React from 'react';
import { SideBar, SideBarItem } from '../Dashboard/styles';

export default ({ currentView, setCurrentView}) => {

    const handleLogOut = () => {
        console.log('Handle Logout Here');
    }

    return (
        <SideBar>
            <div>
                <SideBarItem
                    onClick={() => setCurrentView('home')}
                    active={currentView === 'home'}
                >
                    <p>Home</p>
                </SideBarItem>
                <SideBarItem
                    onClick={() => setCurrentView('create')}
                    active={currentView === 'create'}
                >
                    <p>Create PotLuck</p>
                </SideBarItem>
                <SideBarItem
                    onClick={() => setCurrentView('potluck-list')}
                    active={currentView === 'potluck-list'}
                >
                    <p>PotLucks</p>
                </SideBarItem>
            </div>
            <div>
                <SideBarItem onClick={handleLogOut}>
                    <p>Logout</p>
                </SideBarItem>
            </div>
        </SideBar>
    );
}