

function displayResults(responseJson){
    console.log(responseJson);
    
    $('.js-results').empty();

    for (let i=0; i< responseJson.contents.quotes.length; i++){

        $('.js-results').append(`<li><h2>${responseJson.contents.quotes[i].title}</h2><q>${responseJson.contents.quotes[i].quote}</q>
            </li>`
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
    //Creating Url string
    const paramsString = formatParams(params)
    const url = baseUrl + paramsString;
    
    const options = {
        headers : new Headers({
            "X-TheySaidSo-Api-Secret": apiKey
        })
    }

    fetch(url, options)
    .then(response => response.json())
    .then(responseJson =>displayResults(responseJson))
    .catch (error => alert("Please Try Again Later"));

}



function displayPictures(responseJson){
    console.log(responseJson);
    $('.photoResults').empty();

    for(let i=0; i< responseJson.photos.length; i++){
  
    $('.photoResults').append(
      `<img src="${responseJson.photos[i].src.large2x}" class="result-img" alt ="randomImg">`
    )}
  }
  
  
  function formatParams2(params2){
      const queryItems = Object.keys(params2).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params2[key])}`);
      return queryItems.join('&');
  }
  
  
  
  function getPicture(selectedValue, baseUrl2, apiKey2, selectedNum, numPerPage){
    // creating an object array to set up parameters
    const params2 = {
        query: selectedValue,
        per_page: numPerPage,
        page: selectedNum,
    }
  
  
  //create URL string
    const paramsString2 = formatParams2(params2)
    const url2 = baseUrl2 + paramsString2;
  
    const options = {
      headers : new Headers({
          "Authorization": apiKey2
      })
    }
  
  fetch(url2, options)
  .then(response => response.json())
  .then(responseJson => displayPictures(responseJson))
  .catch (error =>alert("Picture not available"));
  
  }




function search(){
    $('form').on('submit', function(){
        event.preventDefault();
        let selectedValue = $('#searchTerm').val();
        if(!selectedValue){
            alert("Choose an Category");
            return;
          }
        const baseUrl = 'https://quotes.rest/qod.json?';
        const apiKey = 'GL8OqsFb_W4BLockU7nWhweF';
        const lang = 'en';
        getQuote(selectedValue, baseUrl, apiKey,lang);
        let selectedNum = $('#pageNum').val();
        const baseUrl2 = 'https://api.pexels.com/v1/search?';
        const apiKey2 = '563492ad6f917000010000012a39f7ec0d58487eace9a38de756b544';
        const numPerPage ='1';
        getPicture(selectedValue, baseUrl2, apiKey2,selectedNum,numPerPage);
        $('.chooseCategory').hide();
        $('.results').show("slow","linear");
        $('.photoResults').show();
        $('.js-button').append( `<button type="backButton" class="backButton">Back</button>`)

    })

}


function restart(){
    $('.js-button').on('click', '.backButton', function(event){
        event.preventDefault();
        $('.results').hide();
        $('.photoResults').empty();
        $('button').remove()
        $('.chooseCategory').show();
        
        
    })
}


$(function(){
    console.log("App is working")
    search();
    restart();
    
})



