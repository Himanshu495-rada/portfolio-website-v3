import styles from "./MenuBar.module.css";

export const MenuBar = () => {
  return (
    <div className={styles.menuBar}>
      <div className={styles.menuItem}>File</div>
      <div className={styles.menuItem}>Edit</div>
      <div className={styles.menuItem}>Selection</div>
      <div className={styles.menuItem}>View</div>
      <div className={styles.menuItem}>Go</div>
      <div className={styles.menuItem}>Run</div>
      <div className={styles.menuItem}>Terminal</div>
      <div className={styles.menuItem}>Help</div>
    </div>
  );
};
