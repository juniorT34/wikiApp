// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector('#form');
const input = document.querySelector('#search');
const errorMsg = document.querySelector('.error-msg');
const resultDisplay = document.querySelector(".result-display");

const loader = document.querySelector(".loader");

form.addEventListener('submit', handleSubmit);

function handleSubmit(e){
    e.preventDefault();

    let inputValue = input.value;
    if(inputValue === ""){
        errorMsg.textContent = "Wops, The input field cannot be empty";
    }else{
        errorMsg.textContent = "";
        loader.style.display = "flex";
        resultDisplay.textContent = "";
        wikiApiCall(inputValue);
    }
}

async function wikiApiCall(searchInput){
    try {

        const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`,{method: 'GET'});
        if(!response.ok){
            throw new Error(`${response.status}`)
        }
        const data = await response.json();
        createCards(data.query.search);
        loader.style.display = "none";
    }catch(error) {
        errorMsg.textContent = `${error}`;
    }
    
}

function createCards(data){
    if(data.length === 0){
        errorMsg.textContent = "Wopsy, no result found";
        loader.style.display = "none";
        return ;
    }
    data.forEach(element =>{
        const url = `https://en.wikipedia.org/?curid=${element.pageid}`
        const card = document.createElement('div');
        card.className = 'result-item';
        card.innerHTML = `<h3 class="result-title">
        <a href=${url} target="_blank">${element.title}</a>
        </h3>
        <a href=${url} class="result-link" target="_blank">${url}</a>
        <span class="result-snippet">${element.snippet}</span><br />
        `
        resultDisplay.append(card);

    })
}
