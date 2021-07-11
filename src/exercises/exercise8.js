const {concatAll} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeMap(movies => movie.title),
        concatAll(
            fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings').pipe(
                mergeMap(rating => rating.score)
            ),
            fromHttpRequest('https://orels-moviedb.herokuapp.com/directors').pipe(
                mergeMap(directors => directors.name)
            ),
        )
    ).subscribe(console.log);