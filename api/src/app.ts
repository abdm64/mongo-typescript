import  express  from "express";
import { json, urlencoded } from "body-parser";
import userRouter from "./routes/user"
import hobbieRouter from "./routes/hobby"
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc'

const app = express();


const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "mongo node express api docs",
			version: "1.0.0",
			description: "",
		},
		servers: [
			{
				url: process.env.BASE_URL ||  "http://localhost:3000",
			},
		],
	},
	apis: process.env.NODE_ENV === 'production' ? ["**/*.js"] : ["**/*.ts"],
};
const specs = swaggerJsDoc(options);



app.get("/", (request: express.Request, response: express.Response) => {

  response.json({
    name: "Express application"
  })
});

app.use((err: Error & { status: number }, request: express.Request, response: express.Response, next: express.NextFunction): void => {

  response.status(err.status || 500);
  response.json({
    error: "Server error"
  })
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(json()); 
app.use(urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use("/api/v1/",userRouter)
app.use("/api/v1",hobbieRouter)

// @route   GET /
// @desc    Test Base AP
// @access  Public




export { app };
