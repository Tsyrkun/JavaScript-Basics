let header = document.createElement('header')
header.style = "width: 100%; height: 50px; background-color: blue; margin-bottom: 30px"
document.body.appendChild(header)

initializeFilter(true);
initialHTML(data);


// let fff = function(x,y){
//     return x+y;
// }
//
// fff(10,20);
//
// let foo = (x,y) => {
//     x = +x;
//     return x+y;
// }
// foo(10,20);
//
// let fxx = (x,y) => (x+y);

// let ffff = () => {
//     return {key:'val'}
// }
//
// let ffff = () => ({key:'val'})
// console.log(ffff());