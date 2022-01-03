import axios from "axios";

const getCursedImage = async () => {
  const res = await axios.get("https://cursedimg.herokuapp.com/api");
  const { image }: { image: string } = res.data;
  return image;
};
const getRandomDog = async () => {
  const res = await axios.get("https://random.dog/woof.json");
  const { url }: { url: string } = res.data;
  return url;
};
const getRandomCat = async () => {
  const res = await axios.get("https://aws.random.cat/meow");
  const { file }: { file: string } = res.data;
  return file;
};

const getImageURLs = [getCursedImage, getRandomDog, getRandomCat];

export const getImageURL = async () => {
  const index = Math.floor(Math.random() * getImageURLs.length);
  const getImageURL = getImageURLs[index];

  return await getImageURL();
};
