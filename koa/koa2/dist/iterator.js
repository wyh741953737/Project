'use strict';

var _marked = /*#__PURE__*/regeneratorRuntime.mark(makeIterator);

// function makeIterator (arr) {
//     let nextIndex=0
//     return {
//         next: ()=>{
//             if( nextIndex < arr.length ){
//                 return{
//                     value: arr[nextIndex++],
//                     done:false
//                 }
//             }else{
//                return {  done:true }
//             }
//         }
//     }
// }
// const it=makeIterator(['a','b','c'])
// console.log('1',it.next().value)
// console.log('2',it.next().done)
// console.log('3',it.next().done)

function makeIterator(arr) {
    var i;
    return regeneratorRuntime.wrap(function makeIterator$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    i = 0;

                case 1:
                    if (!(i < arr.length)) {
                        _context.next = 7;
                        break;
                    }

                    _context.next = 4;
                    return arr[i];

                case 4:
                    i++;
                    _context.next = 1;
                    break;

                case 7:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked, this);
}
var t = makeIterator(['a', 'b', 'c']);
console.log('1', t.next().value);
console.log('2', t.next().value);
console.log('3', t.next().value);
//# sourceMappingURL=iterator.js.map