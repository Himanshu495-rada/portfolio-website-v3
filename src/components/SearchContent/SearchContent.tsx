import { useState } from "react";
import { VscSearch, VscFile, VscFolder } from "react-icons/vsc";
import styles from "./SearchContent.module.css";

interface SearchResult {
  id: string;
  fileName: string;
  filePath: string;
  type: "file" | "folder";
  matches?: string[];
}

const SearchContent = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Mock search results for demo
  const mockSearchResults: SearchResult[] = [
    {
      id: "1",
      fileName: "Experience.md",
      filePath: "Portfolio/Experience.md",
      type: "file",
      matches: ["Full Stack Developer", "React", "Node.js"],
    },
    {
      id: "2",
      fileName: "Skills.md",
      filePath: "Portfolio/Skills.md",
      type: "file",
      matches: ["TypeScript", "JavaScript", "Python"],
    },
    {
      id: "3",
      fileName: "Backend_Maker.md",
      filePath: "Projects/Backend_Maker.md",
      type: "file",
      matches: ["API", "Database", "Express"],
    },
    {
      id: "4",
      fileName: "Portfolio",
      filePath: "Portfolio/",
      type: "folder",
    },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    // Simulate search delay
    setTimeout(() => {
      if (query.trim()) {
        const filtered = mockSearchResults.filter(
          (result) =>
            result.fileName.toLowerCase().includes(query.toLowerCase()) ||
            result.matches?.some((match) =>
              match.toLowerCase().includes(query.toLowerCase())
            )
        );
        setSearchResults(filtered);
      } else {
        setSearchResults([]);
      }
      setIsSearching(false);
    }, 300);
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <h3>SEARCH</h3>
      </div>

      <div className={styles.searchInput}>
        <VscSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          className={styles.input}
        />
      </div>

      <div className={styles.searchResults}>
        {isSearching && <div className={styles.loading}>Searching...</div>}

        {!isSearching && searchQuery && (
          <>
            <div className={styles.resultsHeader}>
              {searchResults.length} results for "{searchQuery}"
            </div>

            {searchResults.map((result) => (
              <div key={result.id} className={styles.searchResult}>
                <div className={styles.resultHeader}>
                  {result.type === "file" ? (
                    <VscFile className={styles.resultIcon} />
                  ) : (
                    <VscFolder className={styles.resultIcon} />
                  )}
                  <span className={styles.fileName}>{result.fileName}</span>
                </div>
                <div className={styles.filePath}>{result.filePath}</div>
                {result.matches && (
                  <div className={styles.matches}>
                    {result.matches.map((match, index) => (
                      <span key={index} className={styles.match}>
                        {match}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </>
        )}

        {!isSearching && !searchQuery && (
          <div className={styles.emptyState}>
            <VscSearch size={48} className={styles.emptyIcon} />
            <p>Search across files</p>
            <small>Enter a search term to find files and content</small>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchContent;
