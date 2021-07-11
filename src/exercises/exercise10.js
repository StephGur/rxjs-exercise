const {take} = require("rxjs/operators");
const {from} = require("rxjs");
const {mergeAll} = require("rxjs/operators");
const {toArray} = require("rxjs/operators");
const {mergeMap} = require("rxjs/operators");
const {fromHttpRequest} = require('../utils/http');
const {filter} = require("rxjs/operators");
const {map} = require("rxjs/operators");


fromHttpRequest('https://orels-moviedb.herokuapp.com/movies')
    .pipe(
        mergeAll(),
        take(380),
        mergeMap(movie => from(movie.directors).pipe(
            mergeMap(directorId => {
                return fromHttpRequest(`https://orels-moviedb.herokuapp.com/directors/${directorId}`)
                    .pipe(map(director => director.name))
            }),
            toArray(),
            map(directors => {
                return {
                    title: movie.title,
                    directors: directors,
                    year: movie.year
                }
            })
        )),
        filter(movie => movie.directors.includes('Quentin Tarantino')),
        toArray(),
        map(movie =>
            movie.sort((a, b) => {
                return a.year < b.year ? 1 : -1;
            })
        ),
        map(movies => movies.slice(0, 2))
).subscribe(console.log);


