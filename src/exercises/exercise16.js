const {max} = require("rxjs/operators");
const {from} = require("rxjs");
const {toArray} = require("rxjs/operators");
const {of} = require("rxjs");
const {zip} = require("rxjs");
const {map} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {groupBy} = require("rxjs/operators");
const {take} = require("rxjs/operators");
const {mergeAll} = require("rxjs/operators");
const {fromHttpRequest} = require("../utils/http");

fromHttpRequest('https://orels-moviedb.herokuapp.com/ratings')
    .pipe
    (
        mergeAll(),
        take(150),
        groupBy(rating => rating.movie),
        mergeMap(group => zip(of(group.key), group.pipe(toArray()))),
        map(array => [array[0], array[1].reduce((acc, current) => acc + current.score, 0) / array[1].length]),
        mergeMap(array => fromHttpRequest(`https://orels-moviedb.herokuapp.com/movies/${array[0]}`)
            .pipe(
                map(movie => {
                    return {movie: array[0], score: array[1], directors: movie.directors}
                })
            )
        ),
        mergeMap(items => of(...items.directors)
            .pipe(
                map(item => {
                    return {
                        director: item,
                        movie: items.movie,
                        score: items.score
                    }
                }))
        ),
        groupBy(
            director => director.director
        ),
        mergeMap(group => group.pipe(toArray())),
        mergeMap((array) => from(array)
            .pipe(
                groupBy(movie => movie.movie),
                mergeMap(group => group.pipe(toArray())),
            )),
        map((val) => {
            let sum = 0
            let counter = 0

            val.map(c => {
                sum += c.score;
                counter++;
            })

            let avg = sum / counter

            return {
                director: val[0].director,
                movie: val[0].movie,
                avgScore: avg
            }
        }),
        max((a, b) => a.avgScore < b.avgScore ? -1 : 1),
        mergeMap(max => fromHttpRequest(`https://orels-moviedb.herokuapp.com/directors/${max.director}`)
            .pipe(
                map(director => {
                    return {
                        name: director.name,
                        avgScore: max.avgScore
                    }
                })
            ),
        )
    )
    .subscribe(console.log);

