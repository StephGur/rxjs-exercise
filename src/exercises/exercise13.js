const {max} = require("rxjs/operators");
const {map} = require("rxjs/operators");
const {count} = require("rxjs/operators");
const {fromHttpRequest} = require("../utils/http");
const {filter} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {take} = require("rxjs/operators");
const {mergeAll} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeAll(),
        take(100),
        mergeMap(director => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies`)
            .pipe(
                mergeAll(),
                filter(movie => movie.directors.includes(director.id)),
                count(),
                map(moviesCount => [director.name, moviesCount]),
            )
        ),
        max((a, b) => a[1] < b[1] ? -1 : 1)
    ).subscribe(console.log);