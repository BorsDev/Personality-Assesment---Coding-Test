const startButton = document.getElementById('start-btn');
const nextbtn = document.getElementById('next-btn');
const dataDisplay = document.getElementById('pText');
const questionContainer = document.getElementById('question-container');
let shuffle_q, current_q_idx, progress, persentase;
const questionElement = document.getElementById('question');
const answerElement = document.getElementById('ans-choice');
var myArr = [];

startButton.addEventListener('click', initTest);
nextbtn.addEventListener('click', () => {
    current_q_idx++;
    nextQ();
})

function initTest() {
    startButton.classList.add('hide');
    shuffle_q = questions.sort(() => Math.random() - 0.5);
    current_q_idx = 0;
    var myArr = [];
    dataDisplay.classList.add('hide');


    progress = document.querySelector('.progress-done');
    persentase = current_q_idx + 1;
    progress.style.width = 0 + '%';
    document.getElementById('progress-text').innerText = 0 + '%';

    questionContainer.classList.remove('hide');

    nextQ();
};

function showQ(question) {
    questionElement.innerText = question.question;
    question.ans.forEach(answer => {
        const ans = document.createElement('input');
        const attributes = document.createAttribute("readonly");
        const datarelay = document.createAttribute("onclick")
        var att = document.createAttribute("value");
        datarelay.value = "pushData();"
        att.value = answer.text;
        ans.setAttributeNode(att);
        ans.setAttributeNode(attributes);
        ans.setAttributeNode(datarelay);
        ans.id = 'ans-btn';
        ans.classList.add('btn');
        ans.addEventListener('click', selectAns);
        ans.addEventListener('click', pushData);
        answerElement.appendChild(ans);
    });
};

function resetState() {
    nextbtn.classList.add('hide');
    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
};

function nextQ() {
    resetState();
    showQ(shuffle_q[current_q_idx]);
};

function addProgress() {

    progress = document.querySelector('.progress-done');
    persentase = current_q_idx + 1;
    console.log(current_q_idx)
    console.log(persentase);

    const multiplier = 20;
    progress.style.width = persentase * multiplier + '%';
    document.getElementById('progress-text').innerText = persentase * multiplier + '%';

}

function selectAns() {
    if (shuffle_q.length > current_q_idx + 1) {
        nextbtn.classList.remove('hide');
    } else {
        startButton.innerText = "Retake the Test";
        startButton.classList.remove('hide');
        dataDisplay.classList.remove('hide');
    }
    addProgress();
};

function pushData(e) {
    var data = e.target;
    var inputText = data.value;

    // append data to the array
    myArr.push(inputText);

    var pval = "";

    for (i = 0; i < myArr.length; i++) {
        pval = pval + myArr[i] + " || ";
    }

    // display array data
    document.getElementById('pText').innerHTML = pval;
}

const questions = [
    {
        question: "I value",
        ans:
            [
                { text: "Mercy" },
                { text: "Justice" }
            ]
    }, {
        question: "I appreciate a wide variety of music.",
        ans:
            [
                { text: "Rarely" },
                { text: "Occasionally" },
                { text: "Sometimes" },
                { text: "Usually" },
                { text: "Almost Always" }
            ]
    }, {
        question: "A quiet weekend at home is",
        ans:
            [
                { text: "Boring" },
                { text: "Rejuvenating" }
            ]
    }, {
        question: "I prefer speakers that communicate",
        ans:
            [
                { text: "Literally" },
                { text: "Figuratively" }
            ]
    }, {
        question: "With people, I am more often",
        ans:
            [
                { text: "Brief and to the point" },
                { text: "Friendly and warm" }
            ]
    }
];
