const quoteText = document.getElementById('quote');
const quoteContainer = document.getElementById('quote-container');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader'); 
let apiQuotes = [];

//show Loader
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//hide loader
function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}


//Show New Quote
function newQuote(){
    //Pick quote from array
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    authorText.textContent = quote.author;
    quoteText.textContent = quote.text;

    //Check quote length for styling
    if(quote.text.length > 100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    complete();
    console.log(quote.text.length);
}


// Get quotes from API
async function getQuotes(){
    loading();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        console.log(apiUrl);
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        alert("Error retrieving quote");
        console.log("Error getting quote: " + error);
    }
}

//Tweet Quote
twitterBtn.addEventListener('click', ()=>{
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
})

newQuoteBtn.addEventListener('click', newQuote);

getQuotes()


