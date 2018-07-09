import express          from 'express';
import path             from 'path';
import bodyParser       from 'body-parser';
import logger           from 'morgan';
import mongoose         from 'mongoose';
import bb               from 'express-busboy';
import SourceMapSupport from 'source-map-support';

import jwtMiddleware       from 'express-jwt-middleware';
import Validation          from './middleware/validation';

import { jwtsecret }       from './constants/jwtsecret';

import appRegRoutes        from './routes/reg.route';
import appAuthRoutes       from './routes/auth.route';
import appDataRoutes       from './routes/data.route';
import appSearchRoutes     from './routes/search.route';

var jwtCheck = jwtMiddleware(jwtsecret)

const app = express();

bb.extend(app, {
  upload: true,
  path: '.././client/public/images'
});

app.use(function(req,res,next){
  res.header('Content-Type', 'application/json');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const port = process.env.PORT || 3001;

app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/reactApp');

SourceMapSupport.install();
app.use('/api/reg', Validation, appRegRoutes);
app.use('/api/auth', Validation, appAuthRoutes);
app.use('/api/data', jwtCheck, Validation, appDataRoutes);
app.use('/api/search', jwtCheck, Validation, appSearchRoutes);
app.get('/', (req,res) => {
  return res.end('Api working');
});

app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});