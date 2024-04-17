import app from "./server";

const port = process.env.PORT || 3400;

app.listen(port, () => {
	console.log(`Server is running on port ${port}...`);
});
