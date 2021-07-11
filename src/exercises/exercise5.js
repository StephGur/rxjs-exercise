const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeMap(movies => movies),
        filter(movie =>
            movie.id % 3 == 0)
    )
    .subscribe(console.log);