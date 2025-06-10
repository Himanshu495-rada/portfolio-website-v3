import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <div className={styles.statusBar}>
      <div className={styles.statusLeft}>
        <span>React</span>
        <span>TypeScript</span>
      </div>
      <div className={styles.statusRight}>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Ln 5, Col 12</span>
      </div>
    </div>
  );
};
