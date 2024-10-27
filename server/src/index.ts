import { server, app } from "./socket/socket";
import bodyParser from "body-parser";
import config from "./config/serverConfig";
import apiRoutes from "./routes/index";

const { PORT } = config; 

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRoutes);

server.listen(PORT, () => {
    console.log('server started at', PORT);
});