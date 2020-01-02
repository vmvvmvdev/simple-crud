const express = require('express');
const logger = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const db = require('./server/config/db/db');
const passport = require('passport');
const findEditorByEmail = require('./server/modules/editor/findEditorByEmail');


app = express();
app.disable('x-powered-by');
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(session({
  secret: 'cake is lie',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
// ██████╗  █████╗ ███████╗███████╗██████╗  ██████╗ ██████╗ ████████╗
// ██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝
// ██████╔╝███████║███████╗███████╗██████╔╝██║   ██║██████╔╝   ██║   
// ██╔═══╝ ██╔══██║╚════██║╚════██║██╔═══╝ ██║   ██║██╔══██╗   ██║   
// ██║     ██║  ██║███████║███████║██║     ╚██████╔╝██║  ██║   ██║   
// ╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   
app.use(passport.initialize());
app.use(passport.session());

//# init local passport strategy
require('./server/config/passport/localStrategy');

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  console.log('deserializeUser', email);
  try {
    const user = await findEditorByEmail(email);
    done(null, user);
  } catch (error) {
    done(error)
  }

});

// ██████╗  ██████╗ ██╗   ██╗████████╗███████╗███████╗
// ██╔══██╗██╔═══██╗██║   ██║╚══██╔══╝██╔════╝██╔════╝
// ██████╔╝██║   ██║██║   ██║   ██║   █████╗  ███████╗
// ██╔══██╗██║   ██║██║   ██║   ██║   ██╔══╝  ╚════██║
// ██║  ██║╚██████╔╝╚██████╔╝   ██║   ███████╗███████║
// ╚═╝  ╚═╝ ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝╚══════╝
                                                   
const authRouter = require('./server/routes/auth');
const userRouter = require('./server/routes/user');
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
  console.log(req.user);
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status||500).json({
    message: error.status === 500? 'internal error': error.message
  });
});

app.set('port', process.env.PORT || 8080);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});