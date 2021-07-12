const {count} = require("rxjs/operators");
const {filter} = require("rxjs/operators");
const {max} = require("rxjs/operators");
const {mergeAll} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/genres')
    .pipe(
        mergeAll(),
        mergeMap(genre => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies`)
            .pipe(
                mergeAll(),
                filter(movie => movie.genres.includes(genre.id)),
                count(),
                map(moviesCount => [genre.name, moviesCount]),
            )
        ),
        max((a, b) => a[1] < b[1] ? 1 : -1)
    ).subscribe(console.log);
