console.log("play.js loaded");

const defaultState = {
    teacher: false,
    politics: false,
    underground: false,
    hasRegret: false,
    regret: 0,
};

let state = { ...defaultState };

function resetState(){
  state = { ...defaultState };
}

const gamestuff = document.querySelector(".gamestuff");
const addendum = document.querySelector(".addendum");

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
                condition: () => state.teacher === true,
                label: "Ponder if this could be true and reach out to your therapist.",
                effect: function() {
                    endGame();
                }
            }
        ],
    },
    { type: "image", src: "" }, //[[guy by himself]] 
    { type: "text", content: "You are still 19. You are isolating yourself from friends and family." }, 
    { type: "image", src: "" }, //[[olympics symbol]] 
    { type: "choice", content: "You are 20. You witness the bombing attacks at the 1996 Atlanta Olympics on the news. You...",
        choices: [
            {
                label:"Wonder why no one has ever done this at the Notting Hill carnival. You tell your psychiatrist, 'I am the first domino. Everything else will fall.'",
            },
            {
                label:"Feel horrible about the loss of life.",
                effect: function() {
                    state.regret++;
                }
            }
        ],
    }, 
    { type: "image", src: "" }, //[[london underground logo]] 
    { type: "text", content: "You are 21. After a series of failed jobs, your father gets you a job as an engineer’s assistant with the London Underground." }, 
    { type: "image", src: "" }, //[[a flyer, join the BNP we have tea and crumpets and scones and beans on toast]] 
    { type: "choice", content: "You decide to join the British National Party (BNP), a far-right, fascist political party. You attend two meetings and get to know some of the senior leaders. The party, while racist, does not believe in paramilitary action. You...",
        choices: [
            {
                label:"Stay the course and get involved in party politics.",
                effect: function() {
                    state.politics = true;
                    endGame();
                }
            },
            {
                label: "Leave the party. Extreme and violent action must be taken to preserve the white British race.",
            },
        ],
    },
    { type: "image", src: "" }, //[[tony (not hot) smiling evillly]] 
    { type: "choice", content: "You are 22. Your acquaintance Tony Williams invites you to attend a meeting of the National Socialist Movement (NSM), one of Britain’s up-and-coming neo-Nazi groups. You...",
        choices: [
            {
                label: "Agree to check it out. You are done with playing it safe and want to take drastic action.",
            },
            {
                condition: () => state.regret > 1,
                label: "Don’t follow up. Nazis are a step too extreme for you.",
                effect: function() {
                    state.underground = true;
                    endGame();
                }
            },
        ],
    },
    { type: "text", content: "You start reading books like The Turner Diaries and The Anarchist Cookbook." }, 
    { type: "text", content: "The Anarchist Cookbook is too complex for you to understand, so you read a copy of How to Make Bombs, Part 2 on the internet." },
    { type: "text", content: "You become an involved member of the NSM. You are appointed regional leader of Hampshire and are in charge of about 12 members." }, 
    { type: "image", src: "" }, //[[pills]] 
    { type: "text", content: "You see a doctor about your anxiety attacks, and they prescribe you antidepressants. You tell the doctor that you feel like you are losing your mind." },
    { type: "text", content: "You have had enough of talking about change. Now you want to enact it. You want to start a race war.",
        add: [
            "WHITE SUPREMACY: According to The Turner Diaries, the year 2000 was the year that a racial uprising would occur and racial violence would take to the streets. Copeland wanted to kickstart this to cause people of color to retaliate and white people to vote for the British National Party in response. This is the final aspect that makes Copeland’s attacks explicitly white supremacist. He was anti-government and anti-democratic, as his goal was to bypass the regular election processes entirely and violently influence it. He was very exclusionary and supremacist, as he stated that he believed in 'the master race' (BBC, 2000). He also believed in existential threats and conspiracy theories, as he thought that white people were in danger from ethnic minorities who had emigrated to the UK. And this final aspect of his attacks being inspired by The Turner Diaries proves his belief in apocalyptic fantasies. His goal was to emulate a dystopian society to create one where whites would rule.",
            "INGROUPS AND OUTGROUPS: Extremists view the group that they identify with as the in-group, and view other groups as out-groups. What makes extremists different from other people is that they believe that the survival of their in-group necessitates the destruction of all members of the out-group. In Copeland’s case, his in-group was white people, and his out-groups were ethnic minorities and LGBTQ+ people. For the white race in Britain to survive, Copeland found it necessary and justified to murder members of the out-group.",
        ],
    },
    //addendum: white supremacy + in/out groups
    { type: "header", content: "THE NAIL BOMBINGS" },
    { type: "image", src: "" }, //[[photo after Brixton bomb]] 
    { type: "text", content: "The first of the three nail bombings was carried out on Saturday, April 17, 1999, in Electric Avenue, Brixton. This location was chosen because of the area’s large Black population. The bomb, created using explosives from fireworks and 4-inch nails, was left in a sports bag at Brixton Market. The traders at the market were suspicious of the bag, and it was moved three separate times due to this. After the third move, the bag was left next to the Iceland supermarket. Worried traders called the police, who arrived just as the bomb went off at 5:25 pm. 48 people were injured, many seriously. " },
    { type: "image", src: "" }, //[[photo after Brick Lane bomb]] 
    { type: "text", content: "Brick Lane" },
    { type: "image", src: "" }, //[[photo after Soho bomb]] 
    { type: "text", content: "Soho" },

    { type: "header", content: "ARREST, TRIAL, & LIFE IN PRISON" },
    { type: "text", content: "The police find you in your home. You have no choice but to confess. You show the officers your Nazi paraphernalia." }, 
    { type: "image", src: "" }, //[[photo of his room]] 
    { type: "image", src: "" }, //[[gavel]] 
    { type: "text", content: "Your lawyers try to use your history of mental illness to argue that you can not be held fully liable for your actions." },
    { type: "text", content: "In the first hearing, you plead guilty. You say, 'Not guilty to murder, guilty to manslaughter.'" },
    { type: "choice", content: "A woman in the public gallery bursts into tears and screams, 'You bastard! You bastard!' You...",
        choices: [
            {
                label: "Turn to look at her and smile.",
            },
            {
                label: "Look down at your feet.",
                effect: function() {
                    state.regret++;
                }
            },
        ],
    },
    { type: "choice", content: "At the second hearing, the prosecution asks if you have any regrets for what you have done. You say...",
        choices: [
            {
                label: "'No. I did what I needed to do to preserve the white race.'",
                effect: function() {
                    endGame();
                }
            },
            {
                condition: () => state.regret > 3,
                label: "Nothing. You hang your head in shame.",
                effect: function() {
                    state.hasRegret = true;
                    endGame();
                }
            },
        ],
    },
];

function clearContent(){
  gamestuff.innerHTML = "";
  addendum.innerHTML = "";
}

function renderStep(){
    clearContent();
    wait = false;

    const step = game[stepIndex];

    console.log("Rendering step ", stepIndex);

    if (!step) {
        const p = document.createElement("p");
        p.classList.add("game_p");
        p.textContent = "you've reached the end.";
        gamestuff.appendChild(p);
        return;
    }

    if(step.add){
        console.log("addendum exists");
        for (let i = 0; i < step.add.length; i++) {
            const p = document.createElement("p");
            p.classList.add("addendum_text");
            p.textContent = step.add[i];
            console.log("Rendering addendum: ", p.textContent);
            addendum.appendChild(p);
        }
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
            if(!choice.condition || choice.condition()){
            
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
                
                gamestuff.appendChild(btn);
            }
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