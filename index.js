

function displayResults(responseJson){
    console.log(responseJson);
    /*$('.chooseCategory').hide();*/
    $('.js-results').empty();

    for (let i=0; i< responseJson.contents.quotes.length; i++){

        $('.js-results').append(`<li>${responseJson.contents.quotes[i].quote}
            <h2>${responseJson.contents.quotes[i].title}</h2></li>`
        )};
    
}    


function formatParams(params){
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');

}



function getQuote(selectedValue, baseUrl, apiKey, lang){
    /* setting up parameters*/
    const params ={
        category: selectedValue,
        language: lang,

    }
    /*Creating Url string*/
    const paramsString = formatParams(params)
    const url = baseUrl + paramsString + '&api_Key=' + apiKey;
    

    fetch(url)
    .then(response => response.json())
    .then(responseJson =>displayResults(responseJson))
    .catch (error => alert(" Search Term Must be one of the Category"));

}




function search(){
    $('form').on('submit', function(){
        event.preventDefault();
        let selectedValue = $('#js-searchTerm').val();
        const baseUrl = 'http://quotes.rest/qod.json?';
        const apiKey = 'GL8OqsFb_W4BLockU7nWhweF';
        const lang = 'en';
        getQuote(selectedValue, baseUrl, apiKey,lang);
    })

}


$(function(){
    console.log("App is working")
    search();



})



