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

function *makeIterator(arr) {
    for ( let i = 0; i< arr.length; i++){
        yield arr[i]
    }
}
const t=makeIterator(['a','b','c'])
console.log('1',t.next().value)
console.log('2',t.next().value)
console.log('3',t.next().value)