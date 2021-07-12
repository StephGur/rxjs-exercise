// const {concatAll} = require("rxjs/operators");
// const {mergeMap} = require("rxjs/operators");
// const {fromHttpRequest} = require('../utils/http');
//
// fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
//     .pipe(
//         mergeMap(movies => fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings')
//                 .pipe(
//                     mergeMap(rating => rating.score)
//                 ),
//             mergeMap(movies => fromHttpRequest('https://orels-moviedb.herokuapp.com/directors')
//                 .pipe(
//                     mergeMap(directors => directors.name)
//                 ),
//             ),
//             concatAll()
//         ).subscribe(console.log);