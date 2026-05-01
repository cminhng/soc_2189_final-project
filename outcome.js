const savedState = localStorage.getItem("outState");
const state = savedState ? JSON.parse(savedState) : null;
console.log("Final state:", state);

const outcomes = [
    "The adults in your life are able provide you with the foundations for a good support system. It gives you the courage to become more confident and outgoing. You don’t let the bullies bother you. You are able to build lasting connections, follow good role models, and find support when you need it. As an adult, you become well integrated into society.",
    "You continue to be active in the BNP and eventually run for office. You leave after the 2004 election year after the party wins zero seats in Parliament again. You feel disillusioned by far-right politics.",
    "You continue to work at the London Underground for the rest of your life. You feel unhappy with the people around you, but do little to change it. Just a cog in the machine.",
    "Despite your history of mental illness, the court rules that you are still fully liable for your crimes. You receive six life sentences. While in prison, you attack another inmate and receive an additional three years added to your sentence. You also threaten to assassinate a Spice Girl because she is friends with gay people. After several years, you convert to Islam to atone for what you have done and demand that other inmates refer to you as Saddam, in reference to the dictator Saddam Hussein",
    "In prison, you learn about a deradicalization program that involves education about racism, extremism, and terrorism, and making official apologies to the communities hurt. Through this program, you learn about the organization Life After Hate and become a member. You become involved in P/CVE through advocacy and teaching young British people about your story. You hope that learning that there is a path out will help others in similar situations and prevent further tragedies.",
];

function calculateOutcome(state) {
    if(!state)
        return -1;
    if(state.politics){
        return 1;
    }
    if(state.underground){
        return 2;
    }
    if(state.end){
        return 3;
    }
    if(state.hasRegret){
        return 4;
    }
    // if(state.teacher){
    //     return 0;
    // }
    return 0;
    
}

function displayOutcome(state) {
    const outIndex = calculateOutcome(state);
    const outcome = outcomes[outIndex];
    if (!outcome) return;

    const outcomeContent = document.getElementById("outcome_content");
    if (!outcomeContent) return;

    outcomeContent.innerHTML = ""; // clear previous

    // const title = document.createElement("p");
    // title.classList.add("outcome_header");
    // title.textContent = outcome.title;
    // outcomeContent.appendChild(title);

    // const summary = document.createElement("p");
    // summary.classList.add("outcome_summary");
    // summary.textContent = outcome.summary;
    // outcomeContent.appendChild(summary);

    const desc = document.createElement("p");
    desc.classList.add("outcome_text");
    desc.textContent = outcome;
    outcomeContent.appendChild(desc);
}

document.addEventListener("DOMContentLoaded", function() {
    if (!state) {
        document.getElementById("outcome_content").textContent = "No saved state.";
        return;
    }
    displayOutcome(state);
});
