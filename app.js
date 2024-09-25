const express=require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const productRoutes=require('./routes/productRoutes.js');

// Initialize environment variables
dotenv.config();

const app=express();
// const port=process.env.PORT || 3000;
const port = parseInt(process.env.PORT, 10) || 3000;
// Validate port
if (isNaN(port)) {
    console.error('Invalid PORT number');
    process.exit(1);
}


// Set EJS as the view engine
app.set('view engine', 'ejs');
// Set the directory for the views
app.set('views',"./views"); // Assuming your views are in the 'views' folder



// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret:'mysecretkey',
    saveUninitialized: true,
    resave:false
}));

// Static files
app.use(express.static('public'));

// Routes
app.use('/products',productRoutes);

// Home route
app.get('/',(req,res)=>{
    res.render('index',{title:'Product Management'});
});

// Start server
// app.listen(port,()=>{
//     console.log(`Server is running on http://localhost:${port}`);
    
// });
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
    if (err.code === 'EACCES') {
        console.error(`Port ${port} requires elevated privileges`);
    } else if (err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use`);
    } else {
        console.error('Failed to start server:', err);
    }
    process.exit(1);
});