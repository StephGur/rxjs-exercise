const {count} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');
const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeMap(movie => movie),
        count()
    )
    .subscribe(console.log);