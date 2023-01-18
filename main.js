const base_url = "https://resource-ghibli-api.onrender.com/films"
const select = document.querySelector("#titles")




// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(base_url)
    .then((response) => response.json())
    .then((result) => {
        grabMovieTitles(result)
    })
    .catch((error) => console.log(error))
}

function grabMovieTitles(result){
    for (let i=0; i<result.length; i++){
        const option = document.createElement("option")
        option.value = result[i].id
        option.innerHTML = result[i].title
        select.append(option)
    }
}
// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
