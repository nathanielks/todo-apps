import { initApp } from "./app.js";

const app = initApp();
const port = process.env.API_PORT ?? 3000;
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
