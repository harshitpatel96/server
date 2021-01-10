const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // to enable cookies we have to use cookie-session
const passport = require('passport'); // passport will keep track of user authentication state by using cookies
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey] 
    })
); // how long can this cookie can exist in browser before it expires in milliseconds
// used to sign or encrypt our cookie
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000 // It is used to inject what are called environment variables
app.listen(PORT);
