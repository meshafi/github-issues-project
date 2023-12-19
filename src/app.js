const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const syncRoutes = require('./routes/sync-routes');
const issueRoutes = require('./routes/issue-routes');
const errorHandler = require('./middlewares/error-handler'); 
const { MONGO_URL, PORT } = require('../config/index');
const passportConfig = require('./middlewares/passport-config');
const userRoutes = require('./routes/user-routes');
const app = express();

app.use(express.json());
app.use(passport.initialize());


mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/user', userRoutes);
app.use(syncRoutes);
app.use(issueRoutes);


app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
