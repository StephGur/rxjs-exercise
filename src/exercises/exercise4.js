const {fromHttpRequest} = require('../utils/http');
const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
    )
    .subscribe(movies => console.log(movies.length));