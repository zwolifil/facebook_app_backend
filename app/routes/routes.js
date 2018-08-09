const routes = [
    require('./posts'),
    require('./images'),
    require('./token'),
    require('./profiles'),
    require('./comments')
];

module.exports = function(app){
    routes.forEach(function(route){
       route(app);
    });
};