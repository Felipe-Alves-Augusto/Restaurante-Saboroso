var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socket = require('socket.io');
var usersRouter = require('./routes/users');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var formidable = require('formidable');



var app = express();

// configuração do socket.io
var http = http.Server(app);
var io = socket(http);
//fim da configuração do socket

io.on('connection', (socket)=>{

  console.log('Um novo usuario conectado');

  // io e o emit avisa todos os usuarios que tiverem conectados no socket
  //socket e o emit  vc avisa só o usuario que acabou de se conectar

})

var indexRouter = require('./routes/index')(io);
var adminRouter = require('./routes/admin')(io);

app.use((req,res,next)=>{

  let contentType = req.headers["content-type"];

  if(req.method === 'POST' && contentType.indexOf('multipart/form-data;') > -1){

    var form = formidable.IncomingForm({
      // juntando a pasta que esta rodando a aplicação node com a pasta de imagens onde queremos salvar as imagens
      uploadDir: path.join(__dirname, "/public/images"),
      keepExtensions: true

    });

    form.parse(req, (error,fields, files)=>{
      //req.body = fields;
      req.fields = fields;
      req.files = files;

      next();

    });

  } else {
    next();
  }

});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//configuração do servidor
app.use(session({
  
  secret: 'restaurante saboroso',
  resave: true,
  saveUninitialized: true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin',adminRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

http.listen(3000, ()=>{

  console.log('O seervidor em execução');



})

