const regularButton = document.querySelector("#regularButton");
const italicButton = document.querySelector("#italicButton");
const boldButton = document.querySelector("#boldButton");

const colorDropdown = document.querySelector("#colourSelect");
const enableButton = document.querySelector("#enableButton");
const disableButton = document.querySelector("#disableButton");

const ideaButton = document.querySelector("#ideaButton");
const ideaDiv = document.querySelector("#ideaDiv");

// Sets the text to regular style.
function setTextRegular() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: normal; font-weight: normal");
}

// Sets the text to italic style.
function setTextItalic() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: italic; font-weight: normal");
}

// Sets the text to bold style.
function setTextBold() {
    const text = document.getElementById("changingText");
    text.setAttribute("style", "font-style: normal; font-weight: bold");
}

// Sets the background colour.
function setBackgroundColour(colour) {
    document.body.setAttribute("style", `background-color:${colour}`);
}

// Step 1
regularButton.addEventListener("click", setTextRegular);
italicButton.addEventListener("click", setTextItalic);
boldButton.addEventListener("click", setTextBold);

enableButton.disabled = !colorDropdown.disabled;
disableButton.disabled = colorDropdown.disabled;
colorDropdown.addEventListener('change', (e) => {
    setBackgroundColour(e.target.value);
})

//Step 2 and 3
// Toggle state of color dropdown
function toggleDropdown() {
    colorDropdown.disabled = !colorDropdown.disabled;
    if (colorDropdown.disabled) {
        colorDropdown.removeEventListener("change", (e) => {
            setBackgroundColour(e.target.value);
        })
    } else {
        colorDropdown.addEventListener('change', (e) => {
            setBackgroundColour(e.target.value);
        })
    }

    enableButton.disabled = !colorDropdown.disabled;
    disableButton.disabled = colorDropdown.disabled;
}

enableButton.addEventListener("click", toggleDropdown);
disableButton.addEventListener("click", toggleDropdown);

// Step 4
async function getIdea() {
    try {
        ideaDiv.textContent = "loading...";
        const res = await fetch("https://www.boredapi.com/api/activity");
        const data = await res.json();
        ideaDiv.textContent = data.activity;
    } catch(error) {
        ideaDiv.textContent = error;
    }
} 

ideaButton.addEventListener("click", getIdea);


