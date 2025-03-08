
/*Navbar management*/
const menu_trigger = document.querySelector(".menu_trigger");
const nav = document.querySelector("nav");
const header = document.querySelector("header");

menu_trigger.addEventListener("click", ChangeIconNavBarControl);
document.addEventListener("click", closeMenuOnClickOutside);
function ChangeIconNavBarControl(e){
    // Ajouter la transition uniquement après le premier click
    if (!nav.classList.contains("nav_transition")) {
        nav.classList.add("nav_transition");
    }

    if(menu_trigger.classList.contains("menu_trigger_active")){
        menu_trigger.classList.add("menu_trigger_unactive");
        nav.classList.add("nav_menu_active");
        menu_trigger.classList.remove("menu_trigger_active");
        header.classList.remove("no-scroll-x"); // Masque le dépassement horizontal
    }
    else{
        menu_trigger.classList.add("menu_trigger_active");
        nav.classList.remove("nav_menu_active");
        menu_trigger.classList.remove("menu_trigger_unactive");
        header.classList.add("no-scroll-x"); // Rétablit le dépassement horizontal
    }
    e.stopPropagation()
}

// Fonction pour fermer le menu lorsque l'on clique ailleurs
function closeMenuOnClickOutside(e) {
    // Si le clic est à l'extérieur de l'élément menu_trigger et du nav, fermer le menu
    if (!menu_trigger.contains(e.target) && !nav.contains(e.target)) {
        if (!menu_trigger.classList.contains("menu_trigger_active")) {
            menu_trigger.classList.add("menu_trigger_active");
            nav.classList.remove("nav_menu_active");
            menu_trigger.classList.remove("menu_trigger_unactive");
            header.classList.add("no-scroll-x"); // Rétablit le dépassement horizontal
        }
    }
}



/*hero banner secret word effect*/
const secretWords = [
    "durable",
    "vert",
    "prospère",
    "solidaire",
    "harmonieux",
    "équitable",
    "responsable",
    "radieux",
    "éthique",
    "inclusif",
    "serein",
    "juste",
    "meilleur",
    "lumineux",
    "positif"
];


const secret_word = document.querySelector('#secret_word');

let currentWordIndex = 0;
let charIndex = 0;

function ApplySecretWord() {
    if (charIndex < secretWords[currentWordIndex].length) {
        secret_word.textContent += secretWords[currentWordIndex][charIndex];
        charIndex++;
        setTimeout(ApplySecretWord, 100); // Ajustez le délai si nécessaire
    } else {
        setTimeout(() => {
            secret_word.textContent = "";
            currentWordIndex = (currentWordIndex + 1) % secretWords.length;
            charIndex = 0;
            setTimeout(ApplySecretWord, 500); // Ajustez le délai si nécessaire
        }, 2000);
    }
}

ApplySecretWord();


/*Carrousel*/

function removePx(value) {
    return parseInt(value.replace("px", ""), 10);
}

const carrousel = document.querySelector(".carrousel_actions_solutions");
const items = document.querySelectorAll(".action_solution_container");
const dots = document.querySelectorAll(".dot");

const gap_item_carrousel_value = removePx(window.getComputedStyle(document.querySelector(".carrousel_actions_solutions")).gap);
console.log(gap_item_carrousel_value)

let index = 0;

function updatePagination() {
    dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function handleScrollCarrousel() {
    const itemWidth = items[0].offsetWidth + gap_item_carrousel_value; // Largeur réelle d'un élément

    index++;
    if (index >= items.length) {
        setTimeout(() => {
            carrousel.scrollTo({ left: 0, top: 0, behavior: "instant" });
            index = 0;
            updatePagination();
        }, 1000);
    } else {
        carrousel.scrollTo({ left: index * itemWidth, top: 0, behavior: "smooth" });
        updatePagination();
    }
}

function resetAutoScroll() {
    clearInterval(scrollInterval); // Arrête le cycle en cours
    scrollInterval = setInterval(handleScrollCarrousel, 5000); // Relance après 5s
}

dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        index = i;
        carrousel.scrollTo({ left: index * (items[0].offsetWidth + gap_item_carrousel_value), top: 0, behavior: "smooth" });
        updatePagination();
        resetAutoScroll();
    });
});

// /*Empêcher le défilement manuel*/
// carrousel.addEventListener("scroll", PreventFromScrollingCarrousel)
// function PreventFromScrollingCarrousel(e){
//     e.stopPropagation();
//     carrousel.scrollLeft = index * (items[0].offsetWidth + gap_item_carrousel_value);
// }


let scrollInterval = setInterval(handleScrollCarrousel, 5000);


/*formulaire*/
const form = document.querySelector("form");
const button = document.querySelector("button");

button.addEventListener("click", handleButtonPressed);

function handleButtonPressed(e) {
    e.preventDefault();
}

form.addEventListener("mouseover", handleMouseEnterInput);
form.addEventListener("mouseout", handleMouseLeaveInput);
form.addEventListener("input", handleInputText); // Écoute l'événement de saisie de texte

function handleMouseEnterInput(e) {
    const target = e.target;

    // Vérifie si l'élément survolé est un input ou un label
    if (
        target.id === "nom_input" ||
        target.id === "prenom_input" ||
        target.id === "email_input" ||
        (target.tagName === "LABEL" && (
            target.getAttribute("for") === "nom_input" ||
            target.getAttribute("for") === "prenom_input" ||
            target.getAttribute("for") === "email_input"
        ))
    ) {
        const inputElement = target.tagName === "LABEL" ? document.getElementById(target.getAttribute("for")) : target;
        inputElement.previousElementSibling.classList.add("active_input");
    }
}

function handleMouseLeaveInput(e) {
    const target = e.target;

    // Vérifie si l'élément survolé est un input ou un label
    if (
        target.id === "nom_input" ||
        target.id === "prenom_input" ||
        target.id === "email_input" ||
        (target.tagName === "LABEL" && (
            target.getAttribute("for") === "nom_input" ||
            target.getAttribute("for") === "prenom_input" ||
            target.getAttribute("for") === "email_input"
        ))
    ) {
        const inputElement = target.tagName === "LABEL" ? document.getElementById(target.getAttribute("for")) : target;
        if (inputElement.value === "") {
            inputElement.previousElementSibling.classList.remove("active_input");
        }
    }
}

function handleInputText(e) {
    const target = e.target;

    // Si un texte est saisi dans un input spécifique, ajouter la classe active_input
    if (
        target.id === "nom_input" ||
        target.id === "prenom_input" ||
        target.id === "email_input"
    ) {
        if (target.value !== "") {
            target.previousElementSibling.classList.add("active_input");
        } else {
            target.previousElementSibling.classList.remove("active_input");
        }
    }
}



/*Chiffres*/
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.querySelector(".grid_chiffres_environnement");

    grid.addEventListener("mouseover", function (event) {
        const cell = event.target.closest(".cell");
        if (!cell) return;

        if (cell.id === "emissions_energie_card") {
            cell.classList.add("aura-grise");
        }
        else if(cell.id === "pollution_plastique_card"){
            cell.classList.add("aura-bleue");
        }
        else if (cell.id === "biodiversite_menacee_card") {
            cell.classList.add("aura-verte");
        } else if (cell.id === "dechets_alimentaires_card") {
            cell.classList.add("aura-beige");
        }
    });

    grid.addEventListener("mouseout", function (event) {
        const cell = event.target.closest(".cell");
        if (!cell) return;

        cell.classList.remove("aura-grise", "aura-verte", "aura-beige", "aura-bleue");
    });
});

