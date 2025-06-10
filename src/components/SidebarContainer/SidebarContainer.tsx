import { useState, useRef, useEffect } from "react";
import { Explorer } from "../Explorer/Explorer";
import SearchContent from "../SearchContent/SearchContent";
import GitContent from "../GitContent/GitContent";
import styles from "./SidebarContainer.module.css";

interface SidebarContainerProps {
  activePanel: "files" | "search" | "git";
  width: number;
  onWidthChange: (width: number) => void;
  isMobile: boolean;
}

const SidebarContainer = ({
  activePanel,
  width,
  onWidthChange,
  isMobile,
}: SidebarContainerProps) => {
  const [isResizing, setIsResizing] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return;
    e.preventDefault();
    setIsResizing(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || isMobile) return;

      const newWidth = e.clientX - 48; // 48px is activity bar width
      const minWidth = 200;
      const maxWidth = Math.min(600, window.innerWidth * 0.5);

      if (newWidth >= minWidth && newWidth <= maxWidth) {
        onWidthChange(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
  }, [isResizing, isMobile, onWidthChange]);

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

  return (
    <div
      ref={sidebarRef}
      className={styles.sidebarContainer}
      style={{ width: isMobile ? undefined : `${width}px` }}
    >
      {renderContent()}
      {!isMobile && (
        <div className={styles.resizeHandle} onMouseDown={handleMouseDown} />
      )}
    </div>
  );
};

export default SidebarContainer;
