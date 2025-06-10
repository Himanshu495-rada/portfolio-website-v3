import { useTab } from "../../context/TabContext";
import { TabBar } from "../TabBar/TabBar";
import styles from "./MainContent.module.css";

export const MainContent = () => {
  const { getActiveTab } = useTab();
  const activeTab = getActiveTab();

  return (
    <div className={styles.mainContent}>
      <TabBar />

      <div className={styles.contentArea}>
        {activeTab ? (
          <div className={styles.tabContent}>{activeTab.content}</div>
        ) : (
          <div className={styles.welcomeScreen}>
            <div className={styles.welcomeContent}>
              <h1>Welcome to VS Code Clone</h1>
              <h2>Interactive Portfolio</h2>
              <p style={{ color: "var(--tab-active-foreground)" }}>
                Navigate through the file explorer to discover projects, skills,
                and experience.
              </p>
              <p style={{ color: "var(--tab-inactive-foreground)" }}>
                Click on files in the explorer or use the activity bar to
                explore different sections.
              </p>
              <div className={styles.quickActions}>
                <p>🗂️ Explore files in the sidebar</p>
                <p>👤 Click Account icon for profile</p>
                <p>⚙️ Click Settings for themes</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
