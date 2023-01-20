const base_url = "https://resource-ghibli-api.onrender.com";
const select = document.querySelector("#titles");
const h3 = document.createElement("h3");
const div = document.querySelector("div");
const pYear = document.createElement("p");
const pDescription = document.createElement("p");
const reviewForm = document.querySelector(".reviewForm");
const reviewText = document.getElementById("review");
const ul = document.querySelector("ul");
const resetReviews = document.querySelector("#reset-reviews");
const peopleButton = document.querySelector("button");
const ol = document.querySelector(".here")

// To ensure Cypress tests work as expeded, add any code/functions that you would like to run on page load inside this function

function run() {
    fetch(`${base_url}/films`)
    .then((response) => response.json())
        .then((filmResult) => {
            grabTitles(filmResult);
            getDescription(filmResult);
        })
        .catch((error) => console.err(error));
}

function grabTitles(filmResult) {
    for (let i = 0; i < filmResult.length; i++) {
        const option = document.createElement("option");
        option.value = filmResult[i].id;
        option.innerText = filmResult[i].title;
        select.append(option);
    }
}


function getDescription(filmResult) {
    select.addEventListener("change", (event) => {
        event.preventDefault();
        fetch(`${base_url}/people`)
                .then((response) => response.json())
                .then((peopleResult) => {
                    showPeople(peopleResult);
                })
                .catch((error) => console.log(error));
        ol.innerHTML = ""
        for (let i = 0; i < filmResult.length; i++) {
            if (select.value === filmResult[i].id) {
                div.append(h3);
                div.append(pYear);
                div.append(pDescription);

                h3.setAttribute("value", filmResult[i].id)
                h3.innerText = filmResult[i].title;
                pYear.innerText = filmResult[i].release_date;
                pDescription.innerText = filmResult[i].description;
            }           
        }
    })
}

reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (select.value === "") {
        alert("Please select a movie first")
    } else {
    const userInput = reviewText.value;
    reviewForm.reset();

    const li = document.createElement("li");
    const strong =document.createElement("strong");
    strong.innerText = `${h3.innerHTML}: `;
    li.innerText = userInput;
    li.prepend(strong);
    ul.append(li);

    resetReviews.addEventListener("click", () => {
        li.remove();
    })
    }
});

select.addEventListener("change", () => {
    fetch(`${base_url}/people`)
        .then((response) => response.json())
        .then((peopleResult) => {
            showPeople(peopleResult);
        })
        .catch((error) => console.log(error));
})

peopleButton.addEventListener("click", () => {
    ol.style.display = "block";
    fetch(`${base_url}/people`)
        .then((response) => response.json())
        .then((peopleResult) => {
            showPeople(peopleResult);
        })
        .catch((error) => console.log(error));
})

function showPeople(peopleResult) {
    console.log(h3);
    for (let i = 0; i < peopleResult.length; i++) {
        if (h3.getAttribute("value") === peopleResult[i].films[0].slice(7)) {
            const li = document.createElement("li");
            li.style.display = 'none'
            li.innerText = peopleResult[i].name;
            ol.append(li);
        }
    }
}



 

// This function will "pause" the functionality expected on load long enough to allow Cypress to fully load
// So that testing can work as expected for now
// A non-hacky solution is being researched

setTimeout(run, 1000);
