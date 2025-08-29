
import React, { useState, createContext, useContext, ReactNode, useEffect } from 'react';

interface TabsContextProps {
    activeTab: string;
    setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextProps | null>(null);

const useTabs = () => {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('This component must be used within a <Tabs> component.');
    }
    return context;
};

export const Tabs: React.FC<{ children: ReactNode; defaultTab: string }> = ({ children, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab);

    useEffect(() => {
        setActiveTab(defaultTab);
    }, [defaultTab]);

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
};

export const TabList: React.FC<{ children: ReactNode; 'aria-label': string }> = ({ children, ...props }) => {
    return (
        <div role="tablist" {...props} className="flex-shrink-0 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6">
            {children}
        </div>
    );
};

export const Tab: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
    const { activeTab, setActiveTab } = useTabs();
    const isActive = activeTab === id;

    return (
        <button
            role="tab"
            aria-selected={isActive}
            aria-controls={`tab-content-${id}`}
            id={`tab-${id}`}
            onClick={() => setActiveTab(id)}
            className={`-mb-px flex items-center whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-blue-400 focus:ring-opacity-50 ${
                isActive
                    ? 'border-primary text-primary dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:border-gray-300 dark:hover:border-gray-500 hover:text-primary dark:hover:text-blue-400'
            }`}
        >
            {children}
        </button>
    );
};

export const TabContent: React.FC<{ id: string; children: ReactNode }> = ({ id, children }) => {
    const { activeTab } = useTabs();
    const isActive = activeTab === id;
    
    return (
        <div
            role="tabpanel"
            id={`tab-content-${id}`}
            aria-labelledby={`tab-${id}`}
            hidden={!isActive}
        >
            {isActive ? children : null}
        </div>
    );
};