const {concatMap} = require("rxjs/operators");
const {of} = require("rxjs");
const {zip} = require("rxjs");
const {take} = require("rxjs/operators");
const {mergeAll} = require("rxjs/operators");
const {toArray} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {groupBy} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');
const {map} = require("rxjs/operators");


fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings')
    .pipe(
        mergeAll(),
        take(300),
        groupBy(rating => rating.movie),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(array => [array[0], array[1].reduce((acc, current) => acc + current.score, 0) / array[1].length]),
        mergeMap(avg => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies/${avg[0]}`)
            .pipe(
                map(movie => [movie.title, avg[1]]),
            )
        ),
        toArray(),
        map(movie =>
            movie.sort((a, b) =>
                a[1] < b[1] ? 1 : -1
            ),
        ),
        concatMap(movie => movie)
    ).subscribe(console.log);
