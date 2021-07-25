import { Request, Response} from "express"
import { json, urlencoded } from "body-parser";
import  express  from "express";
import connectDB from "./config/database";

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(json());
app.use(urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req : Request, res: Response) => {
  res.send("API Running");
});


const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;



