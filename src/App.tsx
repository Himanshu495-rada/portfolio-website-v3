import { useEffect, useState } from "react";
import "./App.css";
import { ActivityBar } from "./components/ActivityBar/ActivityBar";
import SidebarContainer from "./components/SidebarContainer/SidebarContainer";
import { Footer } from "./components/Footer/Footer";
import { MainContent } from "./components/MainContent/MainContent";
import { useTab } from "./context/TabContext";
import ProfileContent from "./components/ProfileContent/ProfileContent";

function App() {
  const { openTab } = useTab();
  const [activeSidebarPanel, setActiveSidebarPanel] = useState<
    "files" | "search" | "git"
  >("files");
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(240);

  // Check for mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Hide sidebar by default on mobile
      if (mobile) {
        setSidebarVisible(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Keyboard shortcut to toggle sidebar (Ctrl+B)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "b") {
        event.preventDefault();
        setSidebarVisible((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Open profile tab by default on app start
  useEffect(() => {
    openTab({
      id: "profile",
      name: "Profile",
      path: "profile",
      content: <ProfileContent />,
      fileType: "markdown",
    });
  }, []);

  const handlePanelChange = (panel: "files" | "search" | "git") => {
    // Toggle sidebar if clicking on the same panel
    if (activeSidebarPanel === panel && sidebarVisible) {
      setSidebarVisible(false);
    } else {
      setActiveSidebarPanel(panel);
      setSidebarVisible(true);
    }

    // On mobile, automatically hide sidebar when opening tabs (for settings/account)
    if (isMobile && panel !== activeSidebarPanel) {
      // Small delay to allow animation
      setTimeout(() => {
        if (activeSidebarPanel !== panel) {
          setSidebarVisible(true);
        }
      }, 100);
    }
  };

  return (
    <div
      className={`vscode-layout ${!sidebarVisible ? "sidebar-hidden" : ""}`}
      style={{
        gridTemplateColumns:
          sidebarVisible && !isMobile
            ? `48px ${sidebarWidth}px 1fr`
            : sidebarVisible
            ? "48px 200px 1fr"
            : "48px 1fr",
      }}
    >
      {/* Activity Bar */}
      <ActivityBar
        onPanelChange={handlePanelChange}
        activePanel={sidebarVisible ? activeSidebarPanel : null}
      />

      {/* Sidebar */}
      {sidebarVisible && (
        <SidebarContainer
          activePanel={activeSidebarPanel}
          width={sidebarWidth}
          onWidthChange={setSidebarWidth}
          isMobile={isMobile}
        />
      )}

      {/* Mobile Overlay */}
      {isMobile && sidebarVisible && (
        <div
          className="mobile-overlay"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* Main Content */}
      <MainContent />

      {/* Status Bar */}
      <Footer />
    </div>
  );
}

export default App;
