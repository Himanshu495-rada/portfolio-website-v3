import { ThemeShowcase } from "../ThemeShowcase";
import ThemeSwitcher from "../ThemeSwitcher";
import styles from "./SettingsContent.module.css";

const SettingsContent = () => {
  return (
    <div className={styles.settingsContainer}>
      <div className={styles.settingsHeader}>
        <h1>Settings</h1>
        <p>Customize your VS Code experience</p>
      </div>

      <div className={styles.settingsSection}>
        <h2>Appearance</h2>
        <div className={styles.sectionContent}>
          <ThemeSwitcher />
        </div>
      </div>

      <div className={styles.settingsSection}>
        <h2>Color Palette</h2>{" "}
        <div className={styles.sectionContent}>
          <ThemeShowcase />
        </div>
      </div>
    </div>
  );
};

export default SettingsContent;
