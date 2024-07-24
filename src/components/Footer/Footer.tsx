import React from "react";
import styles from "./Footer.module.css";

// props definition for this component
interface FooterProps {
  onRefreshAll: () => void;
  loading: boolean;
  ariaLabel: string;
  onGoBack: () => void;
}

export default function Footer({ onRefreshAll, loading, ariaLabel, onGoBack }: FooterProps) {
  return (
    <footer className={styles.appFooter}>
      <button
        className={styles.refreshAllButton}
        onClick={onRefreshAll}
        disabled={loading}
        aria-label={ariaLabel}
      >
        {loading ? "Loading..." : "Refresh All"}
      </button>
      <button className={styles.backButton} onClick={onGoBack}>
        Back
      </button>
    </footer>
  );
}
