const container = document.querySelector(".container")
const monedas = [{
        name: "Material #1",
        image: "images/Material1.png"
    },
    {
        name: "Material #2",
        image: "images/Material2.png"
    },
    {
        name: "Material #3",
        image: "images/Material3.png"
    },
    {
        name: "Material #4",
        image: "images/Material4.png"
    },
    {
        name: "Material #5",
        image: "images/Material5.png"
    },
]

const showMonedas = () => {
    let output = ""
    monedas.forEach(
        ({
            name,
            image
        }) =>
        (output += `
                <div class="card">
                  <img class="card--avatar" src=${image} />
                  <h1 class="card--title">${name}</h1>
                  <a class="card--link" href="#">Comprar</a>
                </div>
                `)
    )
    container.innerHTML = output
}

document.addEventListener("DOMContentLoaded", showMonedas)

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}