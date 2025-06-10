import { Explorer } from "../Explorer/Explorer";
import SearchContent from "../SearchContent/SearchContent";
import GitContent from "../GitContent/GitContent";
import styles from "./SidebarContainer.module.css";

interface SidebarContainerProps {
  activePanel: "files" | "search" | "git";
}

const SidebarContainer = ({ activePanel }: SidebarContainerProps) => {
  const renderContent = () => {
    switch (activePanel) {
      case "files":
        return <Explorer />;
      case "search":
        return <SearchContent />;
      case "git":
        return <GitContent />;
      default:
        return <Explorer />;
    }
  };

  return <div className={styles.sidebarContainer}>{renderContent()}</div>;
};

export default SidebarContainer;
