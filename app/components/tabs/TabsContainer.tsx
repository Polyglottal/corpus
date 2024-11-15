"use client"

// CSS
import '../../globals.css';

// Context and state management
import { useState } from 'react';

// Child components
import Tab from './Tab';
import Manager from '../manager/Manager';


const TabsContainer = () => {
    const [activeTab, setActiveTab] = useState<number>(1);
    const [tabTally, setTabTally] = useState<number[]>([1, 2, 3]); // start with 3 tabs displayed

    const handleSetActiveTab = (tabNum: number) => {
        setActiveTab(tabNum);
    }

    return (
        <div>
            {/* Tab bar */}
            <div className='tabs-container'>
                {
                    tabTally.map((tally) => (
                        <div 
                            className='tab-container'
                            key={tally}
                        >
                                <Tab 
                                    tabNum={tally} 
                                    handleSetActiveTab={handleSetActiveTab} 
                                    activeTab={activeTab} 
                                />
                        </div>
                    ))
                }
            </div>
            {/* Tab Page Space */}
            <div className='tab-page-container'>
                {activeTab === 1 && <Manager />}
                {activeTab === 2 && <div>This is the second tab page space</div>}
                {activeTab === 3 && <div>This is the third tab page space</div>}
            </div>
        </div>
        
    );
};

export default TabsContainer;