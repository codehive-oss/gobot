import axios from "axios";

const getCursedImage = async () => {
  const res = await axios.get("https://cursedimg.herokuapp.com/api");
  const { image }: { image: string } = res.data;
  return image;
};
const getMemeImage = async () => {
  const res = await axios.get("https://meme-api.herokuapp.com/gimme");
  const { url }: {url: string} = res.data;
  return url;
}
const getRandomDog = async () => {
  const res = await axios.get("https://dog.ceo/api/breeds/image/random");
  const { message }: { message: string } = res.data;
  return message;
};
const getRandomCat = async () => {
  const res = await axios.get("https://aws.random.cat/meow");
  const { file }: { file: string } = res.data;
  return file;
};

const getImageURLs = [getCursedImage, getCursedImage, getMemeImage, getRandomDog, getRandomCat];

export const getImageURL = async () => {
  const index = Math.floor(Math.random() * getImageURLs.length);
  const getImageURL = getImageURLs[index];

  return await getImageURL();
};
