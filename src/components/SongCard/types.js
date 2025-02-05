import PropTypes from "prop-types";

export const SongCardProps = {
  artwork: PropTypes.string.isRequired,
  isPlaying: PropTypes.bool,
  children: PropTypes.node,
};
