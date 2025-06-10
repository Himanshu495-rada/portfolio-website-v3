import { useTheme } from "../context/ThemeContext";

export const ThemeShowcase = () => {
  const { theme, setTheme } = useTheme();

  const colorVariables = [
    { name: "--editor-background", label: "Editor Background" },
    { name: "--editor-foreground", label: "Editor Text" },
    { name: "--sidebar-background", label: "Sidebar Background" },
    { name: "--activitybar-background", label: "Activity Bar" },
    { name: "--statusbar-background", label: "Status Bar" },
    { name: "--syntax-keyword", label: "Keywords" },
    { name: "--syntax-string", label: "Strings" },
    { name: "--syntax-comment", label: "Comments" },
    { name: "--syntax-function", label: "Functions" },
  ];

  return (
    <div className="theme-showcase">
      <h2>VS Code Color Palette</h2>{" "}
      <div className="theme-selector">
        <button
          className={theme === "light" ? "active" : ""}
          onClick={() => setTheme("light")}
        >
          Light Theme
        </button>
        <button
          className={theme === "dark" ? "active" : ""}
          onClick={() => setTheme("dark")}
        >
          Dark Theme
        </button>
        <button
          className={theme === "black" ? "active" : ""}
          onClick={() => setTheme("black")}
        >
          Black Theme
        </button>
        <button
          className={theme === "jellyfish" ? "active" : ""}
          onClick={() => setTheme("jellyfish")}
        >
          JellyFish Theme
        </button>
      </div>
      <div className="color-grid">
        {colorVariables.map((variable) => (
          <div key={variable.name} className="color-item">
            <div
              className="color-swatch"
              style={{ backgroundColor: `var(${variable.name})` }}
            />
            <div className="color-info">
              <div className="color-name">{variable.label}</div>
              <div className="color-variable">{variable.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
