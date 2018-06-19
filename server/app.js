import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bb from 'express-busboy';
import SourceMapSupport from 'source-map-support';
// import fileUpload from 'express-fileupload';

// import routes
import appRoutes from './routes/server.route';
// import uploadRoutes from './routes/upload.route';

// define our app using express
const app = express();

// express-busboy to parse multipart/form-data
bb.extend(app);

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set the port
const port = process.env.PORT || 3001;

// Configure file upload module
// app.use(fileUpload());

// configure app
app.use(logger('dev'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false}));
// parse application/json
app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(express.static(path.join(__dirname, 'public')));

// connect to database
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reactApp');

// add Source Map Support
SourceMapSupport.install();

app.use('/api', appRoutes);
// app.use('/upload', uploadRoutes);
app.get('/', (req,res) => {
  return res.end('Api working');
});

// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});