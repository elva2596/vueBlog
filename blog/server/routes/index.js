module.exports = function (app){
  app.use('/api',require('./reg'));
  app.use('/api',require('./login'));
  app.use('/api',require('./admin'));
  app.use('/api',require('./classify'));
  app.use('/api',require('./article'));
}
