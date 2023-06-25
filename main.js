swal("Bienvenu sur le Quizz", "Clique sur OK est c'est parti !!!", "info");

// Définir les questions et les réponses
const questions = [
  {
    question: "La capitale Suisse ?",
    reponses: [
      { texte: "Zurich", correcte: false },
      { texte: "Bâle", correcte: false },
      { texte: "Berne", correcte: true },
      { texte: "Genève", correcte: false },
    ],
  },
  {
    question: "La capitale de la France ?",
    reponses: [
      { texte: "Paris", correcte: true },
      { texte: "Londres", correcte: false },
      { texte: "Berlin", correcte: false },
      { texte: "Madrid", correcte: false },
    ],
  },
  {
    question: "La capitale Allemande ?",
    reponses: [
      { texte: "Alsdorf", correcte: false },
      { texte: "Zurich", correcte: false },
      { texte: "Berlin", correcte: true },
      { texte: "Leipzig", correcte: false },
    ],
  },
  {
    question: "La capitale de Italiene ?",
    reponses: [
      { texte: "Florence", correcte: false },
      { texte: "Gênes", correcte: false },
      { texte: "Turin", correcte: false },
      { texte: "Rome", correcte: true },
    ],
  },
  {
    question: "La capitale de Espagnole?",
    reponses: [
      { texte: "Ayamonte", correcte: false },
      { texte: "Madrid", correcte: true },
      { texte: "Séville", correcte: false },
      { texte: "Tolède", correcte: false },
    ],
  },
];

// Récupérer les éléments HTML
const questionElement = document.getElementById("question");
const reponsesElement = document.getElementById("reponses");
const suivantBtn = document.getElementById("suivant-btn");
const feedbackElement = document.getElementById("feedback");

// Initialiser les variables de quizz
let questionCourante = 0;
let score = 0;
answeredQuestions = 0;
let scoreContainer = document.getElementById("score-container");
scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;

// Afficher la question et les réponses
function afficherQuestion(question) {
  questionElement.innerText = question.question;
  reponsesElement.innerHTML = "";
  question.reponses.forEach((reponse) => {
    let bouton = document.createElement("button");
    bouton.innerText = reponse.texte;
    bouton.classList.add("reponse-btn");
    if (reponse.correcte) {
      bouton.dataset.correct = reponse.correcte;
    }

    bouton.addEventListener("click", choisirReponse);
    reponsesElement.appendChild(bouton);
  });
}

// Gérer le choix de l'utilisateur
function choisirReponse(e) {
  const boutonClique = e.target;
  const correct = boutonClique.dataset.correct;
  if (correct) {
    score++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    feedbackElement.innerText = "Bravo! Bonne réponse";
    feedbackElement.classList.remove("incorrect");
    feedbackElement.classList.add("correct");
  } else {
    feedbackElement.innerText = "Oh mince! Pas la bonne réponse.";
    feedbackElement.classList.add("incorrect");
  }

  Array.from(reponsesElement.children).forEach((bouton) => {
    setStatusClass(bouton, bouton.dataset.correct);
  });
  if (questionCourante === questions.length - 1) {
    suivantBtn.remove();
    terminerQuiz();

    setTimeout(function () {
      location.reload();
    }, 6000);
  }
  suivantBtn.disabled = false;
}

// Définir la classe de statut pour la réponse
function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("incorrect");
  }
}

// Effacer la classe de statut
function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("incorrect");
}

// Passer à la question suivante
function suivantQuestion() {
  questionCourante++;
  if (questionCourante < questions.length) {
    afficherQuestion(questions[questionCourante]);
    suivantBtn.disabled = true;
    feedbackElement.innerText = "";
  } else {
    terminerQuiz();
  }
}

// Terminer le quiz
function terminerQuiz() {
  questionElement.innerText = "Quizz terminé !";
  reponsesElement.innerHTML = "";
  suivantBtn.disabled = false;
  if (score >= 3) {
    feedbackElement.innerText = `Bravo ! Vous avez obtenu un bon score de ${score} sur ${questions.length}.`;
  } else {
    feedbackElement.innerText = `Pas de bon resultat !!! Votre score était de ${score} sur ${questions.length}. `;
  }
}

// Démarrer le quiz
afficherQuestion(questions[questionCourante]);

// Ajouter un gestionnaire d'événements pour le bouton "Suivant"
suivantBtn.addEventListener("click", suivantQuestion);
