const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeMap(movies => movies),
        filter(movie =>
            movie.year < 1990 && movie.directors.length > 1)
    )
    .subscribe(movie => console.log(movie));