const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');

const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");

fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
    .pipe(
        mergeMap(directors => directors),
        filter(director =>
                director.name.charAt(0).toLocaleLowerCase() == director.name.slice(-1))
    )
    .subscribe(director => console.log(director));