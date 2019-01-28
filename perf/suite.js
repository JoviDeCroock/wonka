const Wonka = require('..');
const Rx = require('rxjs');
const RxOperators = require('rxjs/operators');
const most = require('most');

const input = [1, 2, 3, 4, 5, 6, 7, 8, 9];

suite('Promisified map, filter, scan, last', () => {
  benchmark('Wonka', () => {
    return Wonka.pipe(
      Wonka.fromArray(input),
      Wonka.map(x => x * 2),
      Wonka.filter(x => x > 4),
      Wonka.scan((acc, x) => acc + x, 0),
      Wonka.toPromise
    );
  });

  benchmark('RxJS', () => {
    return Rx.from(input).pipe(
      RxOperators.map(x => x * 2),
      RxOperators.filter(x => x > 4),
      RxOperators.scan((acc, x) => acc + x, 0)
    ).toPromise();
  });

  benchmark('most', () => {
    return most.from(input)
      .map(x => x * 2)
      .filter(x => x > 4)
      .scan((acc, x) => acc + x, 0)
      .thru(s => s.reduce((_, x) => x))
  });
});
