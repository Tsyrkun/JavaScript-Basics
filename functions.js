function rand (min, max){
    if(max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else{
        return Math.floor(Math.random() * (min + 1));
    }
}

function initialHTML(arr = []) {
    let container = document.createElement('div')
    if(document.getElementById('container')){
        document.body.removeChild(document.getElementById('container'));
    }
    container.setAttribute('id', 'container')
    container.style = "width: 80%; margin: auto; background-color: #f7f7f7"
    arr.forEach(function (item, i, arr) {
        let good = document.createElement('div')
        good.style = "border: 1px solid; float: left; width: 33%; text-align: center"
        let content = `<h2>${item.name}</h2>
                       <img src="${item.img}" style = "display: block; width: 70%; margin: auto; object-fit: cover;" alt="${item.name}">
                       <p>${item.description}</p>
                       <div>${item.price}$</div>
                       <div>
                            <i  
                                class = ${item.isAvailable ? "'fas fa-check'":"'fas fa-times'"}
                                style = ${item.isAvailable ? "'color: green; border: 1px solid black'" : "'color: red; border: 1px solid black; width: 1em'"}>
                            </i>
                        </div>
                       <button dataId = "${item.id}">Add to card</button>`
        good.innerHTML = content;
        container.appendChild(good)

    })
    let clearFixed = document.createElement('div');
    clearFixed.style.clear = "both"
    container.appendChild(clearFixed)
    document.body.appendChild(container)
}

function initializeFilter(isRising) {
    let aside = document.createElement('aside')
    aside.style = "width: 10%; background-color: #addfad; position: fixed"
    let form = document.createElement('form')
    if(isRising) {
        data.sort(function (a, b) {
            return a.price - b.price
        })
    }
    else{
        data.sort(function (a, b) {
            return b.price - a.price
        })
    }
    let min = data[0].price,
        max = data[data.length - 1].price

    let range = document.createElement('input')
    let textarea = document.createElement('input')
    let checkbox = document.createElement('input')
    let rising = document.createElement('button')
    let decline = document.createElement('button')

    range.setAttribute('type', 'range')
    range.setAttribute('min', min)
    range.setAttribute('max', max)
    range.oninput = filterPrices;

    textarea.setAttribute('type', 'text')
    textarea.setAttribute('size', 17)
    textarea.oninput = filterSearch;

    checkbox.setAttribute('type', 'checkbox')
    checkbox.setAttribute('name', 'avaliable')
    checkbox.style.display = "block"
    checkbox.onchange = filterAvaliability;

    rising.style = "width: 100px; height: 20px"
    rising.setAttribute('name', 'Ascending')
    rising.setAttribute('type', 'button')
    rising.innerHTML = `Ascending`
    rising.onclick = rise.bind(rising, true);

    decline.style = "width: 100px; height: 20px"
    decline.setAttribute('name', 'Descendingly')
    decline.setAttribute('type', 'button')
    decline.innerHTML = `Dscendingly`
    decline.onclick = rise.bind(decline, false);

    form.appendChild(range);
    form.appendChild(textarea)
    form.appendChild(checkbox)
    form.appendChild(rising)
    form.appendChild(decline)
    aside.appendChild(form)
    document.body.appendChild(aside)
}
function filterPrices() {
    let currentFilterPrice = +this.value
    // let filterData = data.filter(item => item.price <= currentFilterPrice)
    let filterData = data.filter(function(item){
        return item.price <= currentFilterPrice
    })
    initialHTML(filterData)

}

function filterAvaliability(){
    let filterData = data.filter(item => (this.checked == item.isAvailable || !this.checked))
    initialHTML(filterData)
}

function filterSearch() {
    let filterData = data.filter(item => (item.name.includes(this.value)))
    initialHTML(filterData)
}

function rise(isRising) {
    if(isRising) {
        data.sort(function (a, b) {
            return a.price - b.price
        })
    }
    else{
        data.sort(function (a, b) {
            return b.price - a.price
        })
    }
    initialHTML(data)
}