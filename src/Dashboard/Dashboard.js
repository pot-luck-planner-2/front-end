import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';

import Welcome from './Welcome';
import PotLuckForm from '../components/PotLuckForm';
import UpdatingPotluck from '../components/UpdatingPotluck';

import { Dashboard } from './styles';

export default () => {
    const [currentView, setCurrentView] = useState('home');

    return (
        <Dashboard>
            <SideBar
                currentView={currentView}
                setCurrentView={setCurrentView}
            />
            {currentView === 'home' && <Welcome setCurrentView={setCurrentView}/>}
            {currentView === 'create' && <PotLuckForm/>}
            {currentView === 'potluck-list' && <UpdatingPotluck/>}
        </Dashboard>
    );
}