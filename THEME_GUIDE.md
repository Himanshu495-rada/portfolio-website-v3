# VS Code Color Palettes

This project includes authentic VS Code color palettes for creating a VS Code-like interface in React.

## Available Themes

### 1. Light Theme (`light`)

Based on VS Code's "Default Light+" theme

- Clean white background with dark text
- Blue accent colors for selections and highlights
- Optimized for daylight usage

### 2. Dark Theme (`dark`)

Based on VS Code's "Dark+" theme (default)

- Dark background with light text
- Blue accent colors matching VS Code
- Most popular theme among developers

### 3. Black Theme (`black`)

Based on VS Code's "High Contrast Dark" theme

- Pure black background for maximum contrast
- High contrast borders and bright text
- Accessibility-focused design

## Color Variables

### Editor Colors

- `--editor-background`: Main editor background
- `--editor-foreground`: Primary text color
- `--editor-line-highlight`: Current line highlight
- `--editor-selection`: Text selection background
- `--editor-cursor`: Cursor color

### Sidebar Colors

- `--sidebar-background`: File explorer background
- `--sidebar-foreground`: File explorer text
- `--sidebar-border`: Sidebar border color

### Activity Bar

- `--activitybar-background`: Left activity bar background
- `--activitybar-foreground`: Active icon color
- `--activitybar-inactive-foreground`: Inactive icon color
- `--activitybar-border`: Activity bar border

### Status Bar

- `--statusbar-background`: Bottom status bar background
- `--statusbar-foreground`: Status bar text
- `--statusbar-border`: Status bar border

### Tabs

- `--tab-active-background`: Active tab background
- `--tab-active-foreground`: Active tab text
- `--tab-inactive-background`: Inactive tab background
- `--tab-inactive-foreground`: Inactive tab text
- `--tab-border`: Tab border color

### Interactive Elements

- `--button-background`: Button background
- `--button-foreground`: Button text
- `--button-hover-background`: Button hover state

### Input Fields

- `--input-background`: Input field background
- `--input-foreground`: Input field text
- `--input-border`: Input field border
- `--input-focus-border`: Input field focus border

### Panels

- `--panel-background`: Panel background (terminal, output, etc.)
- `--panel-border`: Panel border color

### Menus

- `--menu-background`: Context menu background
- `--menu-foreground`: Context menu text
- `--menu-selection-background`: Menu item hover background
- `--menu-border`: Menu border color

### Syntax Highlighting

- `--syntax-keyword`: Keywords (import, function, etc.)
- `--syntax-string`: String literals
- `--syntax-comment`: Comments
- `--syntax-number`: Numeric literals
- `--syntax-function`: Function names
- `--syntax-variable`: Variable names
- `--syntax-type`: Type names
- `--syntax-error`: Error highlights

## Usage

### Setting Theme

```typescript
import { useTheme } from "./context/ThemeContext";

function MyComponent() {
  const { theme, setTheme, toggleTheme } = useTheme();

  return (
    <div>
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("black")}>Black</button>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
}
```

### Using Color Variables in CSS

```css
.my-component {
  background-color: var(--editor-background);
  color: var(--editor-foreground);
  border: 1px solid var(--panel-border);
}
```

## Theme Persistence

Themes are automatically saved to localStorage and restored on page reload. The theme is applied via a `data-theme` attribute on the document root element.

## Responsive Design

The layout includes responsive breakpoints for mobile devices, ensuring the VS Code interface works well on smaller screens.
