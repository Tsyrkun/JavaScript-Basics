var data = [];

let text = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi distinctio odit tempora. Adipisci dolorem eius eos exercitationem id laudantium nam quis repellendus! Dolor excepturi magnam, maiores optio repellendus similique voluptate.'
let textArr = text.split(' ');
//ctrl+D - copy
for(let i = 0; i < 100; i++){
   let randNumber = rand(0, textArr.length - 5)
    let obj = {
        id: i,
        name:`name ${i}`, //tamplate strings - конкатенация вместо +
        price:rand(100, 10000),
        isAvailable:!!rand(0, 1),
        img:'1.jpeg',
        description:textArr.slice(randNumber, randNumber + 5).join(' ')
    }
    data.push(obj)
}
