const routes = [
    require('./posts'),
    require('./images'),
    require('./token'),
    require('./profiles')
];

module.exports = function(app){
    routes.forEach(function(route){
       route(app);
    });
};