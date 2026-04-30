console.log("play.js loaded");

const defaultState = {
    teacher: false,
    politics: false,
    hasRegret: false,
    regret: 0,
};

let state = { ...defaultState };

function resetState(){
  state = { ...defaultState };
}

const gamestuff = document.querySelector(".gamestuff");

let stepIndex = 0;
let wait = false;

const game = [
    { type: "image", src: "./static/images/soc2189_test.png" },
    { type: "header", content: "EARLY LIFE" },
    { type: "text", content: "You are born into a working-class British family. Your father is a train driver, and your mother is a homemaker. You have two brothers, one older and one younger." },
    { type: "text", content: "Your environment seems to be stable. You are a quiet child at school and at home." },
    { type: "image", src: "" }, //[[small kid standing away from group]] 
    { type: "text", content: "You are 12. You start reading about Hitler and dream about sadistic scenarios in which you are an SS officer. " },
    { type: "choice",
        content: "You feel isolated from your classmates and have few friends. You are short, and the other children at school push you around. You...",
        choices: [
            {
                label: "Punch them and fight back. No one is going to make you feel puny.",
                effect: function () {
                    insertSteps([
                        { type: "image", src: "./static/images/soc2136_final_home7.png" },
                    ]);
                }
            },
            {
                label: "Be the bigger person and try to tolerate it as best you can.",
            },
            {
                label: "You tell a teacher about the bullies and the angry thoughts you’ve been having. They refer you to a therapist, and you form a connection with them.",
                effect: function () {
                    state.regret++;
                    state.teacher = true;
                    insertSteps([
                        { type: "image", src: "./static/images/soc2136_final_home7.png" },
                    ]);
                }
            }
        ]
    },
    { type: "image", src: "" }, //[[The Flintstones]] 
    { type: "choice", content:"You are 13. You watch The Flintstones and hear the part of the theme song that goes 'we'll have a gay old time.' You... ", 
        choices: [
            {
                label: "Know that they are speaking to you and calling you gay.",
            },
            {
                label: "Enjoy the show and think nothing of it.",
                effect: function() {
                    state.regret++;
                }
            }
        ],
    },
    { type: "text", content: "You are 16. You decide to drop out of school and work odd jobs."},
    { type: "image", src: "" }, //[[Your grandmother]] 
    { type: "choice", content:"You are 19. Your parents divorce. Your grandmother asks why you don’t have a girlfriend, and if it’s because you like boys. You...", 
        choices: [
            {
                label: "Vow to never speak to her again.",
            },
            {
                label: "Deny it but move on.",
                effect: function() {
                    state.regret++;
                }
            },
            {
                condition: () => state.earlyOffending === true,
                label: "Ponder if this could be true and reach out to your therapist.",
                effect: function() {
                    endGame();
                }
            }
        ],
    },

    { type: "image", src: "./static/images/soc2189_test.png" },
    { type: "image", src: "./static/images/soc2189_test.png" },
    { type: "image", src: "./static/images/soc2189_test.png" },
    { type: "image", src: "./static/images/soc2189_test.png" },
    { type: "text", content: "Hello!" },
];

function clearContent(){
  gamestuff.innerHTML = "";
}

function renderStep(){
    clearContent();
    wait = false;

    const step = game[stepIndex];

    console.log("Rendering step ", stepIndex);

    // if (step.condition && !step.condition()) {
    //     stepIndex += 1;
    //     renderStep();
    //     return;
    // }

    if (!step) {
        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = "you've reached the end.";
        gamestuff.appendChild(p);
        return;
    }

    if (step.type === "text") {
        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = step.content;
        gamestuff.appendChild(p);
    }

    else if (step.type === "header") {
        const p = document.createElement("p");
        p.classList.add("game_header");
        p.textContent = step.content;
        gamestuff.appendChild(p);
    }

    else if (step.type === "image") {
        const img = document.createElement("img");
        img.classList.add("img");
        img.src = step.src;
        gamestuff.appendChild(img);
    }

    else if (step.type === "choice") {
        wait = true;

        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = step.content;
        gamestuff.appendChild(p);

        step.choices.forEach(function(choice){
            const btn = document.createElement("button");
            btn.classList.add("game_text_button");
            btn.textContent = choice.label;
            btn.onclick = function (e) {
                e.stopPropagation();
                if(choice.effect)
                    choice.effect();
                //conditions only flip once
                if (choice.setTeacher && !state.teacher) {
                    state.teacher = true;
                }
                if (choice.setPolitics && !state.politics) {
                    state.politics = true;
                }
                if(state.regret > 3 && !state.hasRegret){
                    state.hasRegret = true;
                }
                advance();
            };
            if(!step.choices.condition || step.choices.condition())
                gamestuff.appendChild(btn);
        });
    }
}

function advance(){
    if(stepIndex > game.length){
        endGame();
        return;
    }
    stepIndex += 1;
    renderStep();
}

function insertSteps(steps) {
  game.splice(stepIndex + 1, 0, ...steps);
}

gamestuff.addEventListener("click", function(){
  if (!wait) {
    advance();
  }
});

function endGame(){
    console.log("Game over. Final state:", state);
    localStorage.setItem("outState", JSON.stringify(state));
    window.location.href = "outcome.html";
}

function start() {
  stepIndex = 0;
  renderStep();
}

resetState();
start();