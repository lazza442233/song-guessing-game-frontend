export const styles = {
  container: "bg-white rounded-lg shadow-lg p-4 m-2",
  imageWrapper: "relative",
  image: (isPlaying) =>
    `w-full h-48 object-cover rounded ${
      isPlaying ? "ring-4 ring-primary" : ""
    }`,
};
