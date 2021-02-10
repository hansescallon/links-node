const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//inizializations
const app = express();
//settings
app.set('port', process.env.POT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}));
app.set('view engine', '.hbs');

//middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//global variables
app.use((req, res, next) => {
    next();
});
//Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use(require('./routes/links'));
//public
app.use(express.static(path.join(__dirname, 'public')));
//startin the server 
app.listen(app.get('port'), () => {
    console.log('iniciando el servidor en el puerto: ' + app.get('port'));
})