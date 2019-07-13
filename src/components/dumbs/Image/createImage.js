const createImage = src => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = src;
    image.onload = resolve;
    image.onrrror = reject;
  });
};
export default createImage;
