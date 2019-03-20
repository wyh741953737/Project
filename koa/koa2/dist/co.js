'use strict';

var co = require('co');
var fetch = require('node-fetch'); //请求数据
// co(function *() {
//     const res = yield fetch('https://api.douban.com/v2/movie/1291843')
//     const movie=yield res.json()
//     const summary=movie.summary
//     console.log('summary',summary)
// })
function run(generator) {
    var iterator = generator(); //调用生成器产生迭代器对象
    var i = iterator.next(); //next方法
    var promise = i.value;
    promise.then(function (data) {
        //拿到data
        var i2 = iterator.next(data);
        var promise2 = i2.value;
        promise2.then(function (data2) {
            iterator.next(data2);
        });
    });
}
run( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var res, movie, summary;
    return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.next = 2;
                    return fetch('https://api.douban.com/v2/movie/1291843');

                case 2:
                    res = _context.sent;
                    _context.next = 5;
                    return res.json();

                case 5:
                    movie = _context.sent;
                    summary = movie.summary;

                    console.log('summary', summary);

                case 8:
                case 'end':
                    return _context.stop();
            }
        }
    }, _callee, this);
}));
//# sourceMappingURL=co.js.map