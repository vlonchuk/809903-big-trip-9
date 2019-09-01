const MAX_PHOTO_COUNT = 10;

export const generatePhoto = () => {
  const photoCount = 1 + Math.floor(Math.random() * MAX_PHOTO_COUNT);
  const result = new Array(photoCount);
  for (let i = 0; i < result.length; i++) {
    result[i] = `http://picsum.photos/300/150?r=${Math.random()}`;
  }
  return result;
};
