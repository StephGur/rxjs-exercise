const {mergeAll} = require("rxjs/operators");
const {count} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {groupBy} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        groupBy(movie => movie.year),
        mergeMap(group => group.pipe(count(), map(movieCount => [group.key, movieCount]))),
    ).subscribe(console.log);