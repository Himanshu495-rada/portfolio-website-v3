import { useTheme } from "../context/ThemeContext";

function ThemeSwitcher() {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div className="theme-panel">
      <h3>Theme Switcher</h3>
      <p>
        Current theme: <strong>{theme}</strong>
      </p>
      <div className="theme-buttons">
        <button onClick={() => setTheme("light")}>Light</button>
        <button onClick={() => setTheme("dark")}>Dark</button>
        <button onClick={() => setTheme("black")}>Black</button>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
    </div>
  );
}

export default ThemeSwitcher;
