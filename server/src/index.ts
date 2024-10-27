import { server, app } from "./socket/socket";
import bodyParser from "body-parser";
import config from "./config/serverConfig";

const { PORT } = config; 

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));

server.listen(PORT, () => {
    console.log('server started at', PORT);
});