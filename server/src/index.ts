import { server, app } from "./socket/socket";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "./config/serverConfig";
import apiRoutes from "./routes/index";
import credentials from "./middlewares/credentials";
import cors from "cors";
import corsOptions from "./config/corsOptions";

const { PORT } = config; 

app.use(credentials);
app.use(cors(corsOptions));
app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/api', apiRoutes);

server.listen(PORT, () => {
    console.log('server started at', PORT);
});