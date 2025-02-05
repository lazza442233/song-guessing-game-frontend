import React from "react";
import { styles } from "./styles";
import { SongCardProps } from "./types";

const SongCard = ({ artwork, isPlaying, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <img
          src={artwork}
          alt="Album artwork"
          className={styles.image(isPlaying)}
        />
      </div>
      {children}
    </div>
  );
};

SongCard.propTypes = SongCardProps;

export default SongCard;
