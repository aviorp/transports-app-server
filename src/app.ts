import { AuthInfo } from './interfaces/authInfo.interface';
import { connectToMongo } from './db';
import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/routes';
import authRoutes from './routes/authRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import transportRoutes from './routes/transportRoutes';
import cors from 'cors';
import morgan from 'morgan';
import multer from 'multer';

const app = express();
const port = process.env.port || 3000;
const server = app.listen(port, () => console.log(`listening on port ${port}`));
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});
const storage = multer.diskStorage({
    destination: (req: Request, file, cb) => {
        cb(null, './src/uploads')
    },
    filename: (req: Request, file, cb) => {
        cb(null, file.fieldname)
    }
});
const upload = multer({ storage }).any();

connectToMongo();
app.set('socketio', io);
app.use(express.json());
app.use(cors());
app.use(morgan('tiny'))
app.use(routes);
app.use('/auth', authRoutes);
app.use('/vehicles', vehicleRoutes);
app.use('/transports', transportRoutes);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        error: err
    })
});



app.post('/upload', (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
        if (err) {
            next(err)
        }
        res.end("File is Uploaded")
    })
})
app.get('/download', (req: Request, res: Response, next: NextFunction) => {
    const path = __dirname + "/src/uploads/מכתב התראה לפני תביעה.docx-1607129151233";
    res.sendFile(path);
})

io.on('connection', (socket: any) => {
    console.log("a user connected ");
    // * sign user id as global auth info
    socket.on("sign-user", (authInfo: AuthInfo) => {
        app.set("authInfo", authInfo);
    })

});


