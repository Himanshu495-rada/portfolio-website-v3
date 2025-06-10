import { useState, useEffect } from "react";
import {
  VscGitCommit,
  VscGithub,
  VscRepo,
  VscCalendar,
  VscPerson,
} from "react-icons/vsc";
import styles from "./GitContent.module.css";

interface GitCommit {
  sha: string;
  message: string;
  author: {
    name: string;
    email: string;
    date: string;
  };
  url: string;
}

const GitContent = () => {
  const [commits, setCommits] = useState<GitCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Replace with your actual GitHub repository details
  const GITHUB_REPO = "Himanshu495-rada/portfolio-website-v3"; // Change this to your actual repo
  const GITHUB_URL = `https://github.com/${GITHUB_REPO}`;

  const fetchCommits = async () => {
    try {
      setLoading(true);
      // GitHub API endpoint for commits
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/commits?per_page=10`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch commits");
      }
      const data: any[] = await response.json();
      const formattedCommits: GitCommit[] = data.map((commit: any) => ({
        sha: commit.sha.substring(0, 7),
        message: commit.commit.message,
        author: {
          name: commit.commit.author.name,
          email: commit.commit.author.email,
          date: commit.commit.author.date,
        },
        url: commit.html_url,
      }));

      setCommits(formattedCommits);
      setError(null);
    } catch (error) {
      console.error("Error fetching commits:", error);
      setError("Unable to fetch commits. Using mock data.");
      // Mock data for demonstration
      setCommits([
        {
          sha: "abc123d",
          message: "Add profile tab functionality",
          author: {
            name: "Himanshu Tekade",
            email: "himanshu@example.com",
            date: new Date().toISOString(),
          },
          url: "#",
        },
        {
          sha: "def456e",
          message: "Implement theme context and color palettes",
          author: {
            name: "Himanshu Tekade",
            email: "himanshu@example.com",
            date: new Date(Date.now() - 86400000).toISOString(),
          },
          url: "#",
        },
        {
          sha: "ghi789f",
          message: "Add VS Code layout components",
          author: {
            name: "Himanshu Tekade",
            email: "himanshu@example.com",
            date: new Date(Date.now() - 172800000).toISOString(),
          },
          url: "#",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommits();

    // Auto-refresh commits every 5 minutes
    const interval = setInterval(fetchCommits, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) {
      return `${diffMins} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return `${diffDays} days ago`;
    }
  };

  const openRepository = () => {
    window.open(GITHUB_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.gitContainer}>
      <div className={styles.gitHeader}>
        <h3>SOURCE CONTROL</h3>
        <button
          className={styles.refreshButton}
          onClick={fetchCommits}
          disabled={loading}
          title="Refresh commits"
        >
          ↻
        </button>
      </div>

      <div className={styles.repoSection}>
        <div className={styles.repoInfo}>
          <VscRepo className={styles.repoIcon} />
          <span className={styles.repoName}>{GITHUB_REPO.split("/")[1]}</span>
        </div>
        <button
          className={styles.openRepoButton}
          onClick={openRepository}
          title="Open repository in browser"
        >
          <VscGithub size={16} />
          Open Repo
        </button>
      </div>

      {error && (
        <div className={styles.errorMessage}>
          <small>{error}</small>
        </div>
      )}

      <div className={styles.commitsSection}>
        <div className={styles.sectionHeader}>
          <VscGitCommit className={styles.sectionIcon} />
          <span>Recent Commits</span>
        </div>

        {loading ? (
          <div className={styles.loading}>
            <div className={styles.loadingSpinner}></div>
            Loading commits...
          </div>
        ) : (
          <div className={styles.commitsList}>
            {commits.map((commit) => (
              <div key={commit.sha} className={styles.commitItem}>
                <div className={styles.commitHeader}>
                  <span className={styles.commitSha}>{commit.sha}</span>
                  <span className={styles.commitDate}>
                    <VscCalendar size={12} />
                    {formatDate(commit.author.date)}
                  </span>
                </div>
                <div className={styles.commitMessage}>
                  {commit.message.split("\n")[0]}
                </div>
                <div className={styles.commitAuthor}>
                  <VscPerson size={12} />
                  {commit.author.name}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.gitActions}>
        <button className={styles.actionButton} disabled>
          <VscGitCommit size={16} />
          Commit
        </button>
        <button className={styles.actionButton} disabled>
          Push
        </button>
        <button className={styles.actionButton} disabled>
          Pull
        </button>
      </div>
    </div>
  );
};

export default GitContent;
