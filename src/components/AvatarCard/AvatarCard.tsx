import Image from "next/image";
import styles from "./AvatarCard.module.css";
import { useState } from "react";

const defaultAvatar = "/png/default.png";

interface AvatarCardProps {
  url: string;
  onRefresh: () => void;
}

export default function AvatarCard({ url, onRefresh }: AvatarCardProps) {
  const [hovered, setHovered] = useState(false);
  const [imageSrc, setImageSrc] = useState(url);

  const handleError = () => {
    setImageSrc(defaultAvatar);
  };

  return (
    <div
      className={styles.avatarCard}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        key={url}
        src={url || defaultAvatar}
        alt="avatar"
        width={250}
        height={250}
        className={`${styles.avatarImage} ${
          hovered ? styles.avatarImageDarken : ""
        }`}
        priority
        onError={handleError}
      />
      {hovered && (
        <div className={styles.refreshIcon} onClick={onRefresh}>
          <Image
            src="/svg/001-refresh.svg"
            alt="refresh"
            className={styles.refreshSvg}
            width={100}
            height={100}
            style={{
              filter:
                "invert(31%) sepia(92%) saturate(2108%) hue-rotate(88deg) brightness(101%) contrast(104%)",
            }}
          />
        </div>
      )}
    </div>
  );
}
