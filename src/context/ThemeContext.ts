import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark" | "black" | "jellyfish";

interface ThemeContextType {
  theme: Theme; // The current theme state
  toggleTheme: () => void; // Function to toggle between themes
  setTheme: (theme: Theme) => void; // Function to set a specific theme
}

interface ThemeProviderProps {
  children: ReactNode; // Children components that will have access to the theme context
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // Get theme from localStorage or default to dark
    const savedTheme = localStorage.getItem("vscode-theme") as Theme;
    return savedTheme || "dark";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("vscode-theme", newTheme);
  };

  const toggleTheme = () => {
    const themes: Theme[] = ["light", "dark", "black"];
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  // Apply theme to document root
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
