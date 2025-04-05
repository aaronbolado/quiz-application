//DONE Next Submit
//DONE Back button 
//DONE Confirmation before submitting 
//DONE Results. Red sa mga wrong answers
//DONE Implement randomize
//TODO Optimize AppState flow
//DONE Fix checkAnswer increasing score. Submitting without choice.
//DONE Add user_choice in questions objects for tracking 
//? Remove console logs?

const MAX_QUESTIONS = 5;
const MENU = 0, QUIZ = 1, RESULTS = 2;

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
    
    backButton: document.getElementById("back-button"),
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
        answer: "D",
        user_choice: ""
    },
    {
        topic_id: "PPC",
        img_src: "",
        question: "Batay sa panlasa ng masang pilipino, aling C2 flavor ang pinakamasarap?",
        choices: ["Red", "Transparent", "Green", "Yellow"],
        answer: "A",
        user_choice: ""
    },
    {
        topic_id: "PPC",
        img_src: "",
        question: "Ikaw ay tila sining sa museong 'di naluluma. Binibini kong ginto hanggang kaluluwa. Gonna keep you like the ______",
        choices: ["Painting", "Nu Couch", "No touche", "Nu couche"],
        answer: "D",
        user_choice: ""
    },
    {
        topic_id: "PPC",
        img_src: "img/questions/Kath.png",
        question: "Ano ang sinabi ni Kathryn Bernardo sa eksenang ito?",
        choices: ["Golden Retriever Boy!", "Bad boy!", "Tambay!", "Gangster!"],
        answer: "D",
        user_choice: ""
    },
    {
        topic_id: "PPC",
        img_src: "img/questions/bea.jpg",
        question: "Saang pelikula galing ang eksenang ito?",
        choices: ["4 Sisters and a Wedding", "The Hows of Us", "My Ex and Whys", "One More Chance"],
        answer: "A",
        user_choice: ""
    },

    // Philippine Mythological Creatures
    {
        topic_id: "PMC",
        img_src: "",
        question: "Kapag umuulan ngunit mataas pa rin ang sikat ng araw, sino raw ang ikinakasal?",
        choices: ["Ako", "Tikbalang", "White Lady", "Sirena"],
        answer: "B",
        user_choice: ""
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Kapag napadaan ka sa isang punso, ano ang dapat mong sabihin upang hindi ka manuno?",
        choices: ["Hello po!", "I love you.", "Pasensya ka na.", "Tabi-tabi po!"],
        answer: "D",
        user_choice: ""
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Si Maricris ay buntis, saan dapat siya mag-ingat?",
        choices: ["Sa magnanakaw", "Sa asawa", "Sa manananggal", "Sa akin"],
        answer: "C",
        user_choice: ""
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Ito ay alaga ng aswang na sumisipsip ng dugo mula sa anino ng biktima.",
        choices: ["Daga", "Tyanak", "Sigbin", "Aso"],
        answer: "C",
        user_choice: ""
    },
    {
        topic_id: "PMC",
        img_src: "",
        question: "Kung ikaw ay may sakit na hindi maipaliwanag, sino ang posibleng may kagagawan nito?",
        choices: ["Mangkukulam", "Tikbalang", "Manananggal", "White Lady"],
        answer: "A",
        user_choice: ""
    },

    // Karunungang Bayan
    {
        topic_id: "KB",
        img_src: "",
        question: "Ano man ang gagawin, _________ iisipin.",
        choices: ["Dapat mong", "Mamaya mo na", "Makapitong", "Makatatlong"],
        answer: "C",
        user_choice: ""
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Ano ang ibig sabihin ng 'May gatas pa sa labi'?",
        choices: ["Dugyot", "Bata pa", "Umiinom pa ng gatas", "Bagong gising"],
        answer: "B",
        user_choice: ""
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Basta may tiyaga, may ____?",
        choices: ["Lumpia", "Tinola", "Pansit", "Nilaga"],
        answer: "D",
        user_choice: ""
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Ang dulo’y mapula, puti ang binubuga. Ano ito?",
        choices: ["Pambura", "Lipstick", "Sigarilyo", "Pentel Pen"],
        answer: "C",
        user_choice: ""
    },
    {
        topic_id: "KB",
        img_src: "",
        question: "Ang taong gipit, saan kumakapit?",
        choices: ["Sa railings", "Sa malapit", "Sa patalim", "Sa sarili"],
        answer: "C",
        user_choice: ""
    },

    // Are You A True Pinoy?
    {
        topic_id: "AYATP",
        img_src: "img/questions/mechado-ata.png",
        question: "Anong ulam ang nasa larawan?",
        choices: ["Menudo", "Afritada", "Caldereta", "Mechado"],
        answer: "D",
        user_choice: ""
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
        answer: "C",
        user_choice: ""
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Ano ang paboritong pagkain ng Jollibee mascot na si Popo?",
        choices: ["French Fries", "Burger", "Spaghetti", "Sundae"],
        answer: "A",
        user_choice: ""
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Magkano ang setenta’y nuwebe?",
        choices: ["99", "89", "79", "69"],
        answer: "C",
        user_choice: ""
    },
    {
        topic_id: "AYATP",
        img_src: "",
        question: "Anong oras ang tunay na 'Filipino Time' kapag ang meeting ay 3PM?",
        choices: ["2:50 PM", "3:00 PM", "3:30 PM", "2:00 PM"],
        answer: "C",
        user_choice: ""
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
        score.textContent = `${scores[topic]} / ${MAX_QUESTIONS}`;
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
        
        shuffle(currentQuestionList);
        
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

// HANDLING QUIZ STATE
function handleQuizState(){
    if (questionsAsked < MAX_QUESTIONS) { // Max number of questions per topic
        loadNextQuestion();
        
        // Hide back button if at first question
        elements.backButton.style.display = (questionsAsked === 1)? "none" : "block";
        
        // Change text to submit if at last question
        elements.nextButton.textContent = (questionsAsked === MAX_QUESTIONS || questionsAsked === currentQuestionList.length)? "Submit" : "Next";        
        console.log(questionsAsked);

    } else { 
        console.log("Out of range");
        appState = 2;    
        questionsAsked = 0; // Reset
        changeDivContent(); // Go to results
    }
}

// CHANGE DIV CONTENT (states)
function changeDivContent () {

    switch (appState) {
        case MENU: // MENU/HOME
            changeDivDisplay("menu");
        break;
        
        case QUIZ: // QUIZ/QUESTIONS
            changeDivDisplay("quiz");   
            handleQuizState();
            break;

        case RESULTS: // RESULTS
            changeDivDisplay("result"); 
            displayCorrectAnswers();
            saveScore(); 
            break;
            
        default:
            console.log("Error");
            break;
    }
}

// GENERATE CUSTOM TAGS FOR CORRECT ANSWERS
function displayCorrectAnswers() {
    // Reset to prevent duplicates
    elements.correctAnswersDiv.innerHTML = " ";
    
    // Generate html components for list of correct answers
    currentQuestionList.forEach( element => {
        let correctAnswerComponent = document.createElement('custom');

        // For changing background-color
        let isCorrect = element["answer"] === element["user_choice"]; 

        // ADD CLASSES AND CHANGE STYLES FOR FRONTEND
        correctAnswerComponent.innerHTML = `
        <div class="" style="background-color: ${isCorrect? "green" : "red"}">
            <h2 class="">${currentQuestionList.indexOf(element) + 1}</h2>
            <p class="">${element["question"]}</p>
            <img class="img-fluid" src="${element["img_src"]? element["img_src"]: ""}" alt="">
            <p class="">${element["answer"]}</p>
            <p class="">${element["user_choice"]}</p>
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

// LOAD PREVIOUS QUESTION
function prevQuestion() {
    
    // Go back once to previous index
    nextQuestionIndex--;
    
    // Assign previous question as current question
    currentQuestion = currentQuestionList[nextQuestionIndex];

    // Only take from score if previous answer was correct
    if (currentQuestion.user_choice === currentQuestion.answer) {
        scoreCount--;
    }
    
    // Needs to go back twice since variable increments each display
    questionsAsked -= 2; 
    
    changeDivContent();
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
            
            currentQuestion.user_choice = chosenAnswer; // Save user's answer
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
    
    currentQuestion.user_choice = chosenAnswer; // Save user's answer
    nextQuestionIndex++;
    changeDivContent(); // Should load next question
}

// RANDOMIZE QUESTIONS
function shuffle(arr) {
    let currentIndex = arr.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [arr[currentIndex], arr[randomIndex]] = [
        arr[randomIndex], arr[currentIndex]];
    }
}


// CHOSEN TOPIC
function setChosenTopic (button) {
    chosenTopic = button.getAttribute("data-topic");

    // Get new list for the chosen topic
    currentQuestionList = questions.filter( question => question.topic_id === chosenTopic );

    shuffle(currentQuestionList);

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