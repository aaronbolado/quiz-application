const NUM_OF_QUESTIONS = 5;
let chosenTopic = null;
let chosenAnswer = null;
let questionIndex = 0;
let appState = 0;

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

// 
document.querySelectorAll(".choices").forEach( button => {
    button.addEventListener("click", () => {
        chosenAnswer = button.getAttribute("value").toString();
        console.log(chosenAnswer);
    });
});

// CHOSEN TOPIC
function setChosenTopic (button) {
    chosenTopic = button.getAttribute("data-topic");
    console.log(chosenTopic);
    appState = 1; // go to quiz state
    changeDivContent();
}

// CHANGE DIV DISPLAY
function changeDivDisplay (state) {
    document.getElementById("menu").style.display = "none";
    document.getElementById("quiz").style.display = "none";
    document.getElementById("result").style.display = "none";

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
            
            break;
        case 2: // RESULTS
            changeDivDisplay("result");   
            break;
            
        default:
            console.log("Error");
            break;
    }
}

// CHECK ANSWER
// function checkAnswer() {
    // if correct
    // scores[chosenTopic]++;

// }


// LOAD NEXT QUESTION
function loadNextQuestion (button) {

    if (questionIndex < NUM_OF_QUESTIONS) {
        // checkAnswer();
        loadNextQuestion();

    } else {
        appState = 2;    
        questionIndex = 0; // Reset
        changeDivContent(); 
    }

    
    questions.forEach(element => {
        let topic = button.getAttribute("data-topic");
        
        if(element.topic_id == topic) {
            questionIndex++;
            
            console.log(questionIndex);
    
            if(element.img_src !== null){
                document.getElementById("question-img-reference").setAttribute("src", element.img_src);
            }
            
            document.getElementById("question-number").innerHTML = questionIndex;
            document.getElementById("question-text").innerHTML = element.question;
            
            let choiceIndex = 1;
            element.choices.forEach(choice => {
                console.log("choice-" + choiceIndex + " " + choice);
                choiceIndex++;
            });
        } else {
            console.log("Not the same topic");
            
            document.getElementById("question-img-reference").setAttribute("src", "");
            document.getElementById("question-number").innerHTML = "";
            document.getElementById("question-text").innerHTML = "";
        }
    });
}