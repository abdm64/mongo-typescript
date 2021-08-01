import { app } from './app';
import connectDB from "./config/database";





// Connect to MongoDB
  connectDB();


const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;



