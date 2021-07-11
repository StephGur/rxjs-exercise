const {mergeMap} = require("rxjs/operators");
const {take} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeMap(director => director),
        take(1)
    )
    .subscribe(console.log);