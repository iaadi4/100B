import { server, app } from "./socket/socket";
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import config from "./config/serverConfig";
import apiRoutes from "./routes/index";
import cors from "cors"
const { PORT } = config; 




app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());


app.use('/api', apiRoutes);



server.listen(PORT, () => {
    console.log('server started at', PORT);
});