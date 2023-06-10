export const placeholderImageUrl = '/placeholder.png';

export const imageExist = (imgUrl) => {
  try {
    const img = new Image();
    img.src = imgUrl;
    return new Promise((resolve) => {
      if (img.complete) {
        resolve(imgUrl);
      }
      img.onload = () => resolve(imgUrl);
      img.onerror = () => resolve(placeholderImageUrl);
    });
  } catch (error) {
    return placeholderImageUrl;
  }
};
