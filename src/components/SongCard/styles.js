export const styles = {
  container: "bg-white rounded-lg shadow-lg p-4 m-2",
  imageWrapper: "relative",
  image: (isPlaying) => {
    const baseStyles = "w-full h-48 object-cover rounded";
    const dynamicStyles = isPlaying ? "ring-4 ring-primary" : "";

    return `${baseStyles} ${dynamicStyles}`;
  },
};
