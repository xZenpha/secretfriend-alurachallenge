// app.js

const form = document.getElementById("participant-form");
const nameInput = document.getElementById("name");
const participantList = document.getElementById("participant-list");
const drawButton = document.getElementById("draw-button");
const resultsContainer = document.createElement("div");
resultsContainer.id = "results";
document.querySelector(".container").appendChild(resultsContainer);

let participants = [];

// Agregar participante
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();

    if (name && !participants.includes(name)) {
        participants.push(name);
        updateParticipantList();
        nameInput.value = "";
        drawButton.disabled = participants.length < 2;
    } else {
        alert("Por favor, ingresa un nombre válido o que no se repita.");
    }
});

// Actualizar lista de participantes
function updateParticipantList() {
    participantList.innerHTML = "";
    participants.forEach((name) => {
        const li = document.createElement("li");
        li.textContent = name;
        participantList.appendChild(li);
    });
}

// Sortear amigo secreto
function drawSecretSanta() {
    const shuffled = shuffleArray([...participants]);
    const results = participants.map((name, i) => {
        return `${name} → ${shuffled[i]}`;
    });

    displayResults(results);
}

// Mostrar resultados en la página
function displayResults(results) {
    resultsContainer.innerHTML = "<h2>Resultados del sorteo:</h2>";
    const ul = document.createElement("ul");
    results.forEach((result) => {
        const li = document.createElement("li");
        li.textContent = result;
        ul.appendChild(li);
    });
    resultsContainer.appendChild(ul);
}

// Mezclar array aleatoriamente
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    
    // Asegurar que nadie se asigne a sí mismo
    if (array.some((name, i) => name === participants[i])) {
        return shuffleArray(array);
    }
    
    return array;
}

drawButton.addEventListener("click", drawSecretSanta);
