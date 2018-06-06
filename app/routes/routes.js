const routes = [
    require('./posts'),
    require('./images')
];

module.exports = function(app){
    routes.forEach(function(route){
       route(app);
    });
};