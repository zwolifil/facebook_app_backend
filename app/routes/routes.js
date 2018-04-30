const routes = [
    require('./posts')
];

module.exports = function(app){
    routes.forEach(function(route){
       route(app);
    });
};