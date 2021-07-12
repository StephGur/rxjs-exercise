const {tap} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {take} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        tap(console.log),
        mergeMap(director => director),
        tap(console.log)
        // take(1)
    )
    .subscribe(console.log);