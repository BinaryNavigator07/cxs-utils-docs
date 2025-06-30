import React from 'react';

export const TabContext = React.createContext<string | undefined>(undefined);

interface TabsProps {
  labels: string[];
  children: React.ReactNode;
}

export function Tabs({ labels, children }: TabsProps) {
    const [currentTab, setCurrentTab] = React.useState(labels[0]);

    return (
        <TabContext.Provider value={currentTab}>
            <div className="tabs-container">
                <ul role="tablist" className="tabs-list">
                    {labels.map((label) => (
                        <li key={label} className="tab-item">
                            <button
                                role="tab"
                                aria-selected={label === currentTab}
                                onClick={() => setCurrentTab(label)}
                                className={`tab-button ${label === currentTab ? 'active' : ''}`}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="tab-content">
                    {children}
                </div>
            </div>
            <style jsx>{`
                .tabs-container {
                    margin: 1.5em 0;
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    overflow: hidden;
                }
                
                .tabs-list {
                    display: flex;
                    margin: 0;
                    padding: 0;
                    list-style: none;
                    background-color: #f8f9fa;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .tab-item {
                    margin: 0;
                }
                
                .tab-button {
                    padding: 0.75rem 1rem;
                    border: none;
                    background: transparent;
                    cursor: pointer;
                    font-size: 0.9rem;
                    color: var(--text-color-secondary);
                    border-bottom: 2px solid transparent;
                    transition: all 0.2s ease;
                }
                
                .tab-button:hover {
                    background-color: rgba(0, 0, 0, 0.05);
                    color: var(--text-color-main);
                }
                
                .tab-button.active {
                    color: var(--link-color-active);
                    border-bottom-color: var(--link-color-active);
                    background-color: white;
                }
                
                .tab-content {
                    padding: 1rem;
                    background-color: white;
                }
                
                .tab-content :global(pre) {
                    margin-top: 0;
                }
                
                .tab-content :global(p:first-child) {
                    margin-top: 0;
                }
                
                .tab-content :global(p:last-child) {
                    margin-bottom: 0;
                }
            `}</style>
        </TabContext.Provider>
    );
}

interface TabProps {
  label: string;
  children: React.ReactNode;
}

export function Tab({ label, children }: TabProps) {
    const currentTab = React.useContext(TabContext);

    if (label !== currentTab) {
        return null;
    }

    return <>{children}</>;
}