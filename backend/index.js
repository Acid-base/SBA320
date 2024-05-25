// index.js - The main Express server file (using ES modules)
import express from 'express';
import dotenv from 'dotenv';
import createError from 'http-errors'; // If you are using this
import path from 'path'; // If you need path operations
import cookieParser from 'cookie-parser'; // If you need cookie parsing
import logger from 'morgan'; // If you are using Morgan for logging

// ... import your routes (e.g., import mushroomsRouter from './routes/mushrooms';)

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 3000; // Port from environment or default

// View engine setup (if using template engine like Jade)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// Middleware
app.use(logger('dev')); // Logging middleware (Morgan)
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: false })); // Parse urlencoded bodies
app.use(cookieParser()); // Cookie parsing middleware
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files 

// Use your routes 
// app.use('/', indexRouter); 
// app.use('/users', usersRouter);
// app.use('/mushrooms', mushroomsRouter); 

// Catch 404 and forward to error handler (if needed)
app.use((req, res, next) => { // You can remove req, res if unused
  next(createError(404));
});

// Error handler (if needed)
app.use((err, req, res, next) => { // You can remove req, res, next if unused
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error'); // Assuming you have an error view (e.g., 'views/error.jade')
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app; 
