import React, { createContext, useContext, useState, ReactNode } from "react";

export interface TabFile {
  id: string;
  name: string;
  path: string;
  content: ReactNode;
  isDirty?: boolean;
  fileType: "markdown" | "settings" | "code" | "json";
}

interface TabContextType {
  tabs: TabFile[];
  activeTabId: string | null;
  openTab: (file: TabFile) => void;
  closeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  getActiveTab: () => TabFile | null;
}

interface TabProviderProps {
  children: ReactNode;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider: React.FC<TabProviderProps> = ({ children }) => {
  const [tabs, setTabs] = useState<TabFile[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const openTab = (file: TabFile) => {
    // Check if tab is already open
    const existingTab = tabs.find((tab) => tab.id === file.id);
    if (existingTab) {
      setActiveTabId(file.id);
      return;
    }

    // Add new tab
    setTabs((prevTabs) => [...prevTabs, file]);
    setActiveTabId(file.id);
  };

  const closeTab = (tabId: string) => {
    setTabs((prevTabs) => {
      const newTabs = prevTabs.filter((tab) => tab.id !== tabId);

      // If we're closing the active tab, switch to another tab
      if (activeTabId === tabId) {
        if (newTabs.length > 0) {
          // Switch to the tab before the closed one, or the first tab
          const closedTabIndex = prevTabs.findIndex((tab) => tab.id === tabId);
          const newActiveIndex = Math.max(0, closedTabIndex - 1);
          setActiveTabId(newTabs[newActiveIndex]?.id || null);
        } else {
          setActiveTabId(null);
        }
      }

      return newTabs;
    });
  };

  const setActiveTab = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId);
    if (tab) {
      setActiveTabId(tabId);
    }
  };

  const getActiveTab = (): TabFile | null => {
    return tabs.find((tab) => tab.id === activeTabId) || null;
  };

  const contextValue: TabContextType = {
    tabs,
    activeTabId,
    openTab,
    closeTab,
    setActiveTab,
    getActiveTab,
  };

  return (
    <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>
  );
};

export const useTab = (): TabContextType => {
  const context = useContext(TabContext);
  if (context === undefined) {
    throw new Error("useTab must be used within a TabProvider");
  }
  return context;
};
