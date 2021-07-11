const {reduce} = require("rxjs/operators");
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
        take(100),
        mergeMap(rating => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies/${rating.movie}`)
            .pipe(
                map(movie => {
                    return {
                        title: movie.title,
                        score: rating.score
                    }
                })
            )),
        groupBy(rating => rating.title),
        mergeMap(group => group.pipe(
            reduce((acc, current) => acc + current.score, 0),
            map(ratingAvg => [group.key, ratingAvg]))
        ),
        toArray(),
        map(movie =>
            movie.sort((a, b) => {
                return a[1] < b[1] ? 1 : -1;
            })
        )
// max((a, b) => a[1] < b[1] ? -1 : 1)
    ).subscribe(console.log);

