const savedState = localStorage.getItem("outState");
const state = savedState ? JSON.parse(savedState) : null;
console.log("Final state:", state);

const outcomes = {
    
};

function calculateOutcome(state) {
    if(state.teacher){
        return 1;
    }
    if(state.politics){
        return 2;
    }
    if(state.hasRegret){
        return 3;
    }
    return 4;
    
}

function displayOutcome(state) {
    const outIndex = calculateOutcome(state);
    const outcome = outcomes[outIndex];
    if (!outcome) return;

    const outcomeContent = document.getElementById("outcome_content");
    if (!outcomeContent) return;

    outcomeContent.innerHTML = ""; // clear previous

    const title = document.createElement("p");
    title.classList.add("outcome_header");
    title.textContent = outcome.title;
    outcomeContent.appendChild(title);

    const summary = document.createElement("p");
    summary.classList.add("outcome_summary");
    summary.textContent = outcome.summary;
    outcomeContent.appendChild(summary);

    const desc = document.createElement("p");
    desc.classList.add("outcome_text");
    desc.textContent = outcome.description;
    outcomeContent.appendChild(desc);
}

document.addEventListener("DOMContentLoaded", function() {
    if (!state) {
        document.getElementById("outcome_content").textContent = "No saved state.";
        return;
    }
    displayOutcome(state);
});
