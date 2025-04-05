//DONE Next Submit
//TODO Back button 
//DONE Confirmation before submitting 
//TODO Results. Red sa mga wrong answers
//TODO Implement randomize
//TODO Optimize AppState flow
//TODO Score count
//DONE Fix checkAnswer increasing score. Submitting without choice.
//TODO Add user_choice in questions objects for tracking 
//? Remove console logs?

const MAX_QUESTIONS = 5;

const elements = {
    menu: document.getElementById("menu"),
    quiz: document.getElementById("quiz"),
    result: document.getElementById("result"),
    
    questionNumber: document.getElementById("question-number"),
    questionText: document.getElementById("question-text"),
    questionImg: document.getElementById("question-img-reference"),

    choice1: document.getElementById("choice-1"),
    choice2: document.getElementById("choice-2"),
    choice3: document.getElementById("choice-3"),
    choice4: document.getElementById("choice-4"),
    
    nextButton: document.getElementById("next-button"),

    finalScore: document.getElementById("final-score"),
    returnMenu: document.getElementById("return-menu"),
    restart: document.getElementById("restart"),

    correctAnswersDiv: document.getElementById("correct-answers")
};

const scores = {
    PPC: 0,
    AYATP: 0,
    PMC: 0,
    KB: 0
};

const questions = [
    // Philippine Pop Culture
    {
        topic_id: "PPC",
        img_src: "",
        question: "Ayon sa matalinhagang pananalita ni Nina, anong proseso ang kinakailangang sundin upang maging isang successful person?",
        choices: ["Diagonal Way", "Batch Process", "Iterative Process", "Step-by-Step Process"],
        answer: "D"
    },
    {
        topic_id: "PPC",
        img_src: "",
        question: "Batay sa panlasa ng masang pilipino, aling C2 flavor ang pinakamasarap?",
        choices: ["Red", "Transparent", "Green", "Yellow"],
        answer: "A"
    },
    {
        topic_id: "PPC",
        img_src: "",
        question: "Ikaw ay tila sining sa museong 'di naluluma. Binibini kong ginto hanggang kaluluwa. Gonna keep you like the ______",
        choices: ["Painting", "Nu Couch", "No touche", "Nu couche"],
        answer: "D"
    },
    {
        topic_id: "PPC",
        img_src: "img/questions/Kath.png",
        question: "Ano ang sinabi ni Kathryn Bernardo sa eksenang ito?",
        choices: ["Golden Retriever Boy!", "Bad boy!", "Tambay!", "Gangster!"],
        answer: "D"
    },
    {
        topic_id: "PPC",
        img_src: "img/questions/bea.jpg",
        question: "Saang pelikula galing ang eksenang ito?",
        choices: ["4 Sisters and a Wedding", "The Hows of Us", "My Ex and Whys", "One More Chance"],
        answer: "A"
    },

    // Philippine Mythological Creatures
    {
        topic_id: "PMC",
        img_src: "",
        question: "Kapag umuulan ngunit mataas pa rin ang sikat ng araw, sino raw ang ikinakasal?",
        choices: ["Ako", "Tikbalang", "White Lady", "Sirena"],
        answer: "B"
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Kapag napadaan ka sa isang punso, ano ang dapat mong sabihin upang hindi ka manuno?",
        choices: ["Hello po!", "I love you.", "Pasensya ka na.", "Tabi-tabi po!"],
        answer: "D"
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Si Maricris ay buntis, saan dapat siya mag-ingat?",
        choices: ["Sa magnanakaw", "Sa asawa", "Sa manananggal", "Sa akin"],
        answer: "C"
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Ito ay alaga ng aswang na sumisipsip ng dugo mula sa anino ng biktima.",
        choices: ["Daga", "Tyanak", "Sigbin", "Aso"],
        answer: "C"
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Kung ikaw ay may sakit na hindi maipaliwanag, sino ang posibleng may kagagawan nito?",
        choices: ["Mangkukulam", "Tikbalang", "Manananggal", "White Lady"],
        answer: "A"
    },

    // Karunungang Bayan
    {
        topic_id: "KB",
        img_src: "",
        question: "Ano man ang gagawin, _________ iisipin.",
        choices: ["Dapat mong", "Mamaya mo na", "Makapitong", "Makatatlong"],
        answer: "C"
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Ano ang ibig sabihin ng 'May gatas pa sa labi'?",
        choices: ["Dugyot", "Bata pa", "Umiinom pa ng gatas", "Bagong gising"],
        answer: "B"
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Basta may tiyaga, may ____?",
        choices: ["Lumpia", "Tinola", "Pansit", "Nilaga"],
        answer: "D"
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Ang dulo’y mapula, puti ang binubuga. Ano ito?",
        choices: ["Pambura", "Lipstick", "Sigarilyo", "Pentel Pen"],
        answer: "C"
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Ang taong gipit, saan kumakapit?",
        choices: ["Sa railings", "Sa malapit", "Sa patalim", "Sa sarili"],
        answer: "C"
    },

    // Are You A True Pinoy?
    {
        topic_id: "AYATP",
        img_src: "img/questions/mechado-ata.png",
        question: "Anong ulam ang nasa larawan?",
        choices: ["Menudo", "Afritada", "Caldereta", "Mechado"],
        answer: "D"
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Alin sa mga sumusunod ang tamang paggamit ng 'ng' at 'nang'?",
        choices: [
            "Kumain ng mabilis si Juan bago pumasok sa eskwela.",
            "Umalis siya ng nakangiti kahit may problema.",
            "Nag-aral siya nang mabuti para sa pagsusulit ng kanyang kapatid.",
            "Tumakbo siya nang marathon sa lungsod kahapon."
        ],
        answer: "C"
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Ano ang paboritong pagkain ng Jollibee mascot na si Popo?",
        choices: ["French Fries", "Burger", "Spaghetti", "Sundae"],
        answer: "A"
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Magkano ang setenta’y nuwebe?",
        choices: ["99", "89", "79", "69"],
        answer: "C"
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Anong oras ang tunay na 'Filipino Time' kapag ang meeting ay 3PM?",
        choices: ["2:50 PM", "3:00 PM", "3:30 PM", "2:00 PM"],
        answer: "C"
    }
]

let currentQuestionList = [];

let chosenTopic = null;
let chosenAnswer = null;

let currentQuestion = null;
let questionsAsked = 0;
let nextQuestionIndex = 0;

let appState = 0;
let scoreCount = 0;

document.addEventListener("DOMContentLoaded", updateScores);

// DISPLAY SCORE ON MENU
function updateScores() {
    document.querySelectorAll(".score").forEach( score => {
        let topic = score.getAttribute("data-topic");
        console.log(topic);
        score.innerHTML = scores[topic] + "/" + MAX_QUESTIONS;
    });
}

// RESET CHOICE HIGHLIGHT
function resetHighlight() {
    document.querySelectorAll(".choices").forEach(choice => {
        choice.style.backgroundColor = ""; // Reset
    });
}

// EVENT HANDLING USING EVENT DELEGATION
document.addEventListener("click", (event) => {
    
    // CUSTOM SELECTOR FOR MULTIPLE CHOICE QUESTION
    if (event.target.matches(".choices")) {
        chosenAnswer = event.target.getAttribute("value").toString();
        resetHighlight();
        event.target.style.backgroundColor = "green";
        console.log(chosenAnswer);
    } 
    
    // RESTART QUIZ FOR CURRENT TOPIC 
    if (event.target === elements.restart) {
        appState = 1; // go to quiz state

        // Reset values
        elements.nextButton.textContent = "Next";
        questionsAsked = 0;
        nextQuestionIndex = 0;
        scoreCount = 0;
        
        //? save score na rin ba dito or reset to 0 lang

        changeDivContent();
    }

    // RETURN TO MENU
    if (event.target === elements.returnMenu) {
        appState = 0; // go to menu state
    
        updateScores();
    
        console.log(scores);
    
        scoreCount = 0;
        changeDivContent();
    }
});

// CHANGE DIV DISPLAY
function changeDivDisplay (state) {
    elements.menu.style.display = "none";
    elements.quiz.style.display = "none";
    elements.result.style.display = "none";

    document.getElementById(state).style.display = "block";
}

// CHANGE DIV CONTENT (states)
function changeDivContent () {

    switch (appState) {
        case 0: // MENU/HOME
            changeDivDisplay("menu");
        break;
        
        case 1: // QUIZ/QUESTIONS
            changeDivDisplay("quiz");   

            if (questionsAsked < MAX_QUESTIONS) { // Max number of questions per topic
                loadNextQuestion();
                console.log(questionsAsked);
                if ((questionsAsked) === MAX_QUESTIONS) {
                    elements.nextButton.textContent = "Submit";
                }
            
            } else { 
                console.log("Out of range");
                appState = 2;    
                questionsAsked = 0; // Reset
                changeDivContent(); 
            }
            
            break;
        case 2: // RESULTS
            changeDivDisplay("result"); 
            displayCorrectAnswers();
            resetHighlight();
            saveScore(); 

            break;
            
        default:
            console.log("Error");
            break;
    }
}

// GENERATE CUSTOM TAGS FOR CORRECT ANSWERS
function displayCorrectAnswers() {
    elements.correctAnswersDiv.innerHTML = " ";
    
    currentQuestionList.forEach( element => {        // Create custom components
        let correctAnswerComponent = document.createElement('custom');
        
        correctAnswerComponent.innerHTML = `
        <div class="" style="">
            <h2 class="">${currentQuestionList.indexOf(element) + 1}</h2>
            <p class="">${element["question"]}</p>
            <img class="img-fluid" src="${element["img_src"]? element["img_src"]: ""}" alt="">
            <p class="">${element["answer"]}</p>
            <p class="">User Choice</p>
        </div>
        `;
        
        elements.correctAnswersDiv.appendChild(correctAnswerComponent);
    });
}

// SAVE SCORE
function saveScore() {
    // Display current score
    elements.finalScore.textContent = `You Scored ${scoreCount} / ${currentQuestionList.length}`;

    // Maintain highest score
    if(scoreCount > scores[chosenTopic]) {
        scores[chosenTopic] = scoreCount;
    } 
}

// LOAD QUESTION -> CHECK ANSWER -> QUIZ STATE -> LOAD QUESTION
function checkAnswer() {    

    if (!chosenAnswer) {
        alert("ERROR: Please Choose An Answer");
        return;
    }

    // For submitting answers
    if (questionsAsked === MAX_QUESTIONS) {
        if (confirm("Are you sure you want to submit?")) { // If yes
            if (chosenAnswer === currentQuestion.answer) {
                console.log("Correct Answer!");
                scoreCount++;
            } else {
                console.log("Incorrect Answer!");
            }
            
            changeDivContent(); // Should go to result state
            return;

        } else {
            console.log("Stay");
            return;
        }
    }

    if (chosenAnswer === currentQuestion.answer) {
        console.log("Correct Answer!");
        scoreCount++;
    
    } else {
        console.log("Incorrect Answer!");
    }

    nextQuestionIndex++;
    changeDivContent(); // Should load next question
}


// CHOSEN TOPIC
function setChosenTopic (button) {
    chosenTopic = button.getAttribute("data-topic");

    // Get new list for the chosen topic
    currentQuestionList = questions.filter( question => question.topic_id === chosenTopic );

    console.log(chosenTopic);
    console.log(currentQuestionList);

    // Reset values
    questionsAsked = 0;
    nextQuestionIndex = 0;
    scoreCount = 0;
    
    appState = 1; // go to quiz state
    changeDivContent();
}

// LOAD NEXT QUESTION
function loadNextQuestion () {
    
    // Assign object for readability
    currentQuestion = currentQuestionList[nextQuestionIndex];

    if (currentQuestion) {
        questionsAsked++;

        // Reset choices
        resetHighlight(); 
        chosenAnswer = null;

        if(currentQuestion.img_src){ // Check if an image src exists
            elements.questionImg.setAttribute("src", currentQuestion.img_src);
        } else {
            elements.questionImg.setAttribute("src", "");
        }

        elements.questionNumber.textContent = questionsAsked;
        elements.questionText.textContent = currentQuestion.question ;

        // Populate buttons with choice content
        elements.choice1.textContent = currentQuestion.choices[0];
        elements.choice2.textContent = currentQuestion.choices[1];
        elements.choice3.textContent = currentQuestion.choices[2];
        elements.choice4.textContent = currentQuestion.choices[3];

    } else { // For cases where the MAX_QUESTIONS is higher than total questions available

        console.log("No more questions available for this topic.");
        appState = 2; // go to result state
        changeDivContent();
    }
}