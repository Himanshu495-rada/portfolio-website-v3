import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { VscPreview, VscCode } from "react-icons/vsc";
import styles from "./MarkdownViewer.module.css";

interface MarkdownViewerProps {
  fileName: string;
  filePath: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  fileName,
  filePath,
}) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");

  useEffect(() => {
    const loadMarkdownFile = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch from public/content directory
        const response = await fetch(`/content/${fileName}`);

        if (!response.ok) {
          throw new Error(`Failed to load ${fileName}: ${response.statusText}`);
        }

        const text = await response.text();
        setContent(text);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load markdown file"
        );
      } finally {
        setLoading(false);
      }
    };

    loadMarkdownFile();
  }, [fileName]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{fileName}</span>
          </div>
        </div>
        <div className={styles.loadingContainer}>
          <div className={styles.spinner}></div>
          <p>Loading {fileName}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.fileInfo}>
            <span className={styles.fileName}>{fileName}</span>
          </div>
        </div>
        <div className={styles.errorContainer}>
          <h3>Error Loading File</h3>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={styles.retryButton}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.fileInfo}>
          <span className={styles.fileName}>{fileName}</span>
          <span className={styles.filePath}>{filePath}</span>
        </div>
        <div className={styles.viewToggle}>
          <button
            className={`${styles.toggleButton} ${
              viewMode === "preview" ? styles.active : ""
            }`}
            onClick={() => setViewMode("preview")}
            title="Preview"
          >
            <VscPreview />
            Preview
          </button>
          <button
            className={`${styles.toggleButton} ${
              viewMode === "code" ? styles.active : ""
            }`}
            onClick={() => setViewMode("code")}
            title="Source"
          >
            <VscCode />
            Code
          </button>
        </div>
      </div>

      <div className={styles.content}>
        {viewMode === "preview" ? (
          <div className={styles.markdownContent}>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                h1: ({ children }) => <h1 className={styles.h1}>{children}</h1>,
                h2: ({ children }) => <h2 className={styles.h2}>{children}</h2>,
                h3: ({ children }) => <h3 className={styles.h3}>{children}</h3>,
                h4: ({ children }) => <h4 className={styles.h4}>{children}</h4>,
                h5: ({ children }) => <h5 className={styles.h5}>{children}</h5>,
                h6: ({ children }) => <h6 className={styles.h6}>{children}</h6>,
                p: ({ children }) => (
                  <p className={styles.paragraph}>{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className={styles.unorderedList}>{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className={styles.orderedList}>{children}</ol>
                ),
                li: ({ children }) => (
                  <li className={styles.listItem}>{children}</li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className={styles.blockquote}>
                    {children}
                  </blockquote>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code className={styles.inlineCode}>{children}</code>
                  ) : (
                    <code className={`${styles.codeBlock} ${className}`}>
                      {children}
                    </code>
                  );
                },
                pre: ({ children }) => (
                  <pre className={styles.preBlock}>{children}</pre>
                ),
                table: ({ children }) => (
                  <table className={styles.table}>{children}</table>
                ),
                thead: ({ children }) => (
                  <thead className={styles.tableHead}>{children}</thead>
                ),
                tbody: ({ children }) => (
                  <tbody className={styles.tableBody}>{children}</tbody>
                ),
                tr: ({ children }) => (
                  <tr className={styles.tableRow}>{children}</tr>
                ),
                th: ({ children }) => (
                  <th className={styles.tableHeader}>{children}</th>
                ),
                td: ({ children }) => (
                  <td className={styles.tableCell}>{children}</td>
                ),
                a: ({ children, href }) => (
                  <a
                    href={href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                strong: ({ children }) => (
                  <strong className={styles.bold}>{children}</strong>
                ),
                em: ({ children }) => (
                  <em className={styles.italic}>{children}</em>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className={styles.codeView}>
            <pre className={styles.rawMarkdown}>
              <code>{content}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarkdownViewer;
