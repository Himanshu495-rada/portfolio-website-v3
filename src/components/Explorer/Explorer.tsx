import { useState } from "react";
import { FaFolder, FaMarkdown } from "react-icons/fa";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { useTab } from "../../context/TabContext";
import { MarkdownViewer } from "../MarkdownViewer/MarkdownViewer";
import styles from "./Explorer.module.css";

export const Explorer = () => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["Portfolio", "Projects"]) // Initially expanded
  );
  const { openTab } = useTab();

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };
  const handleFileClick = (fileName: string, path: string) => {
    openTab({
      id: path,
      name: fileName,
      path: path,
      content: <MarkdownViewer fileName={fileName} filePath={path} />,
      fileType: "markdown",
    });
  };

  const isExpanded = (folderName: string) => expandedFolders.has(folderName);

  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarHeader}>
        <span>EXPLORER</span>
      </div>
      <div className={styles.fileTree}>
        {/* Portfolio Folder */}
        <div
          className={styles.fileItem}
          onClick={() => toggleFolder("Portfolio")}
          style={{ cursor: "pointer" }}
        >
          {isExpanded("Portfolio") ? <VscChevronDown /> : <VscChevronRight />}
          <FaFolder fill="#FECD5A" />
          <p>Portfolio</p>
        </div>{" "}
        {isExpanded("Portfolio") && (
          <>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick("Experience.md", "Portfolio/Experience.md")
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>Experience.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick("Skills.md", "Portfolio/Skills.md")
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>Skills.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() => handleFileClick("About.md", "Portfolio/About.md")}
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>About.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick("Contact.md", "Portfolio/Contact.md")
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>Contact.md</p>
            </div>
          </>
        )}
        {/* Projects Folder */}
        <div
          className={styles.fileItem}
          onClick={() => toggleFolder("Projects")}
          style={{ cursor: "pointer" }}
        >
          {isExpanded("Projects") ? <VscChevronDown /> : <VscChevronRight />}
          <FaFolder fill="#FECD5A" />
          <p>Projects</p>
        </div>{" "}
        {isExpanded("Projects") && (
          <>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick("Backend_Maker.md", "Projects/Backend_Maker.md")
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>Backend_Maker.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick("PasteMaster.md", "Projects/PasteMaster.md")
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>PasteMaster.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick(
                  "SQL_Playground.md",
                  "Projects/SQL_Playground.md"
                )
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>SQL_Playground.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick("Music_Player.md", "Projects/Music_Player.md")
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>Music_Player.md</p>
            </div>
            <div
              className={`${styles.fileItem} ${styles.nested}`}
              onClick={() =>
                handleFileClick(
                  "Hotel_Management.md",
                  "Projects/Hotel_Management.md"
                )
              }
              style={{ cursor: "pointer" }}
            >
              <FaMarkdown fill="#56C1D8" />
              <p>Hotel_Management.md</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
