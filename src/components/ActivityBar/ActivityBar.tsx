import { useState } from "react";
import { useTab } from "../../context/TabContext";
import SettingsContent from "../SetttingsContent/SettingsContent";
import ProfileContent from "../ProfileContent/ProfileContent";
import styles from "./ActivityBar.module.css";
import {
  VscAccount,
  VscFiles,
  VscGitMerge,
  VscSearch,
  VscSettingsGear,
} from "react-icons/vsc";

type ActivityItemType = "files" | "search" | "git" | "settings" | "account";

interface ActivityBarProps {
  onPanelChange: (panel: "files" | "search" | "git") => void;
  activePanel?: "files" | "search" | "git" | null;
}

export const ActivityBar = ({
  onPanelChange,
  activePanel,
}: ActivityBarProps) => {
  const [activeItem, setActiveItem] = useState<ActivityItemType>("account");
  const { openTab } = useTab();
  const handleSettingsClick = () => {
    setActiveItem("settings");
    openTab({
      id: "settings",
      name: "Settings",
      path: "settings",
      content: <SettingsContent />,
      fileType: "settings",
    });
  };
  const handleFilesClick = () => {
    setActiveItem("files");
    onPanelChange("files");
  };

  const handleSearchClick = () => {
    setActiveItem("search");
    onPanelChange("search");
  };

  const handleGitClick = () => {
    setActiveItem("git");
    onPanelChange("git");
  };
  const handleAccountClick = () => {
    setActiveItem("account");
    openTab({
      id: "profile",
      name: "Profile",
      path: "profile",
      content: <ProfileContent />,
      fileType: "markdown",
    });
  };

  return (
    <div className={styles.activityBar}>
      <div className={styles.itemsGroup}>
        {" "}
        <div
          className={`${styles.activityItem} ${
            activePanel === "files" ? styles.active : ""
          }`}
          onClick={handleFilesClick}
        >
          <VscFiles size={24} />
        </div>
        <div
          className={`${styles.activityItem} ${
            activePanel === "search" ? styles.active : ""
          }`}
          onClick={handleSearchClick}
        >
          <VscSearch size={24} />
        </div>
        <div
          className={`${styles.activityItem} ${
            activePanel === "git" ? styles.active : ""
          }`}
          onClick={handleGitClick}
        >
          <VscGitMerge size={24} />
        </div>
      </div>
      <div className={styles.itemsGroup}>
        <div
          className={`${styles.activityItem} ${
            activeItem === "settings" ? styles.active : ""
          }`}
          onClick={handleSettingsClick}
        >
          <VscSettingsGear size={24} />
        </div>
        <div
          className={`${styles.activityItem} ${
            activeItem === "account" ? styles.active : ""
          }`}
          onClick={handleAccountClick}
        >
          <VscAccount size={24} />
        </div>
      </div>
    </div>
  );
};
