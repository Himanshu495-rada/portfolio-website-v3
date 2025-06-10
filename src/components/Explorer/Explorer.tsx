import { useState } from "react";
import { FaFolder, FaMarkdown } from "react-icons/fa";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";
import { useTab } from "../../context/TabContext";
import styles from "./Explorer.module.css";

// Mock markdown content for demo
const getMarkdownContent = (fileName: string) => {
  return (
    <div style={{ padding: "20px", fontFamily: "monospace" }}>
      <h1>{fileName}</h1>
      <p>This is a mock content for {fileName}</p>
      <h2>Example Content</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
      <pre
        style={{
          background: "var(--panel-background)",
          padding: "16px",
          borderRadius: "4px",
        }}
      >
        {`# ${fileName}\n\nThis is markdown content for ${fileName}\n\n- Item 1\n- Item 2\n- Item 3`}
      </pre>
    </div>
  );
};

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
      content: getMarkdownContent(fileName),
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
          </>
        )}
      </div>
    </div>
  );
};
