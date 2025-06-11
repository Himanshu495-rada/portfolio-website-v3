import { useTab } from "../../context/TabContext";
import { VscChromeClose } from "react-icons/vsc";
import styles from "./TabBar.module.css";
import { FaFileCode, FaMarkdown } from "react-icons/fa";
import { LuSettings2 } from "react-icons/lu";

export const TabBar = () => {
  const { tabs, activeTabId, setActiveTab, closeTab } = useTab();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleCloseTab = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    closeTab(tabId);
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <div className={styles.tabBar}>
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`${styles.tab} ${
            activeTabId === tab.id ? styles.active : ""
          }`}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.fileType === "markdown" ? (
            <FaMarkdown className={styles.icon} />
          ) : tab.fileType === "settings" ? (
            <LuSettings2 className={styles.icon} />
          ) : (
            <span className={styles.icon}>
              <FaFileCode />
            </span>
          )}

          <span className={styles.tabName}>{tab.name}</span>
          {tab.isDirty && <span className={styles.dirty}>●</span>}
          <button
            className={styles.closeButton}
            onClick={(e) => handleCloseTab(e, tab.id)}
            aria-label={`Close ${tab.name}`}
          >
            <VscChromeClose />
          </button>
        </div>
      ))}
    </div>
  );
};
