//TODO Next Submit
//TODO Back button 
//TODO Confirmation before submitting 
//TODO Results. Red sa mga wrong answers
//TODO Implement randomize

const QUESTIONS_PER_TOPIC = 5;

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

    finalScore: document.getElementById("final-score"),
    returnMenu: document.getElementById("return-menu"),
    restart: document.getElementById("restart"),
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

let chosenTopic = null;
let chosenAnswer = null;

let topicStartingIndex = 0;
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
        score.innerHTML = scores[topic] + "/" + QUESTIONS_PER_TOPIC;
    });
}

// RESET CHOICE HIGHLIGHT
function resetHighlight() {
    document.querySelectorAll(".choices").forEach(choice => {
        choice.style.backgroundColor = ""; // Reset
    });
}

// EVENT LISTENERS FOR DIFFERENT FUNCTIONALITIES
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
        questionsAsked = 0;
        nextQuestionIndex = 0;
        topicStartingIndex = 0;
        
        //? Set score na rin ba dito or reset to 0 lang
        // setScore();
    
        changeDivContent();
    }

    // RETURN TO MENU
    if (event.target === elements.returnMenu) {
        appState = 0; // go to menu state

        questionsAsked = 0;
        nextQuestionIndex = 0;
        topicStartingIndex = 0;
        
        //? Set score na rin ba dito or reset to 0 lang
        // setScore();
    
        updateScores();
    
        console.log(scores);
    
        scoreCount = 0;
        changeDivContent();
    }
});

// CHOSEN TOPIC
function setChosenTopic (button) {
    chosenTopic = button.getAttribute("data-topic");
    console.log(chosenTopic);
    
    // Returns index for the first occurrence of the topic id
    topicStartingIndex = questions.findIndex(question => question.topic_id == chosenTopic);
    console.log(topicStartingIndex);
    
    appState = 1; // go to quiz state
    changeDivContent();
}

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

            if (questionsAsked < QUESTIONS_PER_TOPIC) { // Max number of questions per topic
                loadNextQuestion();
            
            } else { 
                console.log("Out of range");
                appState = 2;    
                questionsAsked = 0; // Reset
                changeDivContent(); 
            }
            
            break;
        case 2: // RESULTS
            changeDivDisplay("result");  
            resetHighlight(); 
            saveScore();

            break;
            
        default:
            console.log("Error");
            break;
    }
}

// SAVE SCORE
function saveScore() {
    if(scores[chosenTopic] < scoreCount) {
        scores[chosenTopic] = scoreCount;
    } 

    elements.finalScore.innerHTML = "You Got " + scores[chosenTopic] + "Correct";
    scoreCount = 0;
}

// CHECK ANSWER
function checkAnswer() {
    if (chosenAnswer == questions[topicStartingIndex + nextQuestionIndex].answer) {
        console.log("Correct Answer!");
        nextQuestionIndex++;
        scoreCount++;
        changeDivContent();
        
    } else {
        console.log("Incorrect Answer!");
        nextQuestionIndex++;
        changeDivContent();
    }
}

// LOAD NEXT QUESTION
function loadNextQuestion () {
    if (questions[topicStartingIndex + nextQuestionIndex].topic_id == chosenTopic) { // Check if question is the same topic
        
        // Removes highlights and prevents going to next question without choosing an answer
        resetHighlight(); 
        chosenAnswer = null;

        if(questions[topicStartingIndex + nextQuestionIndex].img_src !== null){ // Check if an image src exists
            elements.questionImg.setAttribute("src", questions[topicStartingIndex + nextQuestionIndex].img_src);
        } else {
            elements.questionImg.setAttribute("src", "");
        }
        
        elements.questionNumber.innerHTML = (questionsAsked + 1);
        elements.questionText.innerHTML = questions[topicStartingIndex + nextQuestionIndex].question;
        
        // Populates choices with values
        elements.choice1.textContent = questions[topicStartingIndex + nextQuestionIndex].choices[0];
        elements.choice2.textContent = questions[topicStartingIndex + nextQuestionIndex].choices[1];
        elements.choice3.textContent = questions[topicStartingIndex + nextQuestionIndex].choices[2];
        elements.choice4.textContent = questions[topicStartingIndex + nextQuestionIndex].choices[3];
        
        console.log("BEFORE: " + questionsAsked);
        questionsAsked++;
        console.log("AFTER: " + questionsAsked);

    } else { // For cases where questions aren't organized in sequence
        
        // Find next occurrence of questions for the same topic 
        console.log("Looking for next occurrence")
        let nextIndex = questions.findIndex((question, index) => 
            index >= (topicStartingIndex + nextQuestionIndex) && question.topic_id == chosenTopic
        );
        
        if (nextIndex != -1) { // Update starting index if found/exists
            topicStartingIndex = nextIndex; 
            nextQuestionIndex = 0;
            loadNextQuestion();
            
        } else { 
            console.log("No more questions available for this topic.");
            appState = 2;
            changeDivContent();
        }
    }
}