import { PORT } from "./utils/constants";
import { createApp } from "./utils/createApp";


const main = async () => {
  const app = await createApp();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

main();