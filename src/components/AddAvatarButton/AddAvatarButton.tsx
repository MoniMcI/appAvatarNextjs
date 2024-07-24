import React from "react";
import styles from "./AddAvatarButton.module.css";

interface AddAvatarButtonProps {
  onAdd: () => void; 
}

export default function AddAvatarButton({ onAdd }: AddAvatarButtonProps) {
  return (
    <button className={styles.addAvatarButton} onClick={onAdd}>
      <div className={`${styles.plusLine} ${styles.horizontal}`}></div>
      <div className={`${styles.plusLine} ${styles.vertical}`}></div>
    </button>
  );
}
