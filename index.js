import { npcsData } from "./data.js";

const demeanorRadios = document.getElementById("demeanor-radios");
const getImageBtn = document.getElementById("get-image-btn");
const charModalInner = document.getElementById("char-modal-inner");
const charModal = document.getElementById("char-modal");
const charModalCloseBtn = document.getElementById("char-modal-close-btn");

// Closes Modal
charModalCloseBtn.addEventListener("click", function () {
  charModal.style.display = "none";
});

// Highlights radio button checked
demeanorRadios.addEventListener("change", highlightCheckedOption);

getImageBtn.addEventListener("click", renderChar);

function highlightCheckedOption(e) {
  const radios = document.getElementsByClassName("radio");
  for (let radio of radios) {
    radio.classList.remove("highlight");
  }
  document.getElementById(e.target.id).parentElement.classList.add("highlight");
}

// finds a character containing the demeanor tag selected

function getMatchingDemeanorArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const selectedDemeanor = document.querySelector(
      'input[type="radio"]:checked'
    ).value;
    const matchingCharsArray = npcsData.filter(function (char) {
      return char.demeanorTags.includes(selectedDemeanor);
    });
    return matchingCharsArray;
  }
}

function getSingleCharObject() {
  const charsArray = getMatchingDemeanorArray();
  if (charsArray.length === 1) {
    return charsArray[0];
  } else {
    const randomNum = Math.floor(Math.random() * charsArray.length);
    return charsArray[randomNum];
  }
}

function rollStat() {
  console.log();
}

function renderChar() {
  const charObject = getSingleCharObject();
  console.log(charObject);
  charModalInner.innerHTML = `
    <img
        class="char-img"
        src="./images/${charObject.charImg}"
        alt="${charObject.alt}"
    >
    <div class="char-name"><span class="char-label">Name:</span> ${
      charObject.firstName
    } ${charObject.lastName}</div>
    <div class="char-info-container">
        <div class="char-stats-container">
            
            <div class="char-stat"><span class="char-label">Str:</span> <span class="stat-num">${Math.floor(
              Math.random() * (19 - 8) + 8
            )}</span></div>
            <div class="char-stat"><span class="char-label">Dex:</span> <span class="stat-num">${Math.floor(
              Math.random() * (19 - 8) + 8
            )}</span></div>
            <div class="char-stat"><span class="char-label">Con:</span> <span class="stat-num">${Math.floor(
              Math.random() * (19 - 8) + 8
            )}</span></div>
            <div class="char-stat"><span class="char-label">Int:</span> <span class="stat-num">${Math.floor(
              Math.random() * (19 - 8) + 8
            )}</span></div>
            <div class="char-stat"><span class="char-label">Wis:</span> <span class="stat-num">${Math.floor(
              Math.random() * (19 - 8) + 8
            )}</span></div>
            <div class="char-stat"><span class="char-label">Cha:</span> <span class="stat-num">${Math.floor(
              Math.random() * (19 - 8) + 8
            )}</span><span class="stat-mod"></span></div>
        </div>
        <div class="char-deets-container">
        <div class="char-class"><span class="char-label">Race:</span> <span class="char-deet">${
          charObject.race
        }</span></div>
            <div class="char-class"><span class="char-label">Class:</span> <span class="char-deet">${
              charObject.characterClass
            }</span></div>
            <div class="char-class"><span class="char-label">Alignment:</span> <span class="char-deet">${
              charObject.alignment
            }</span></div>
        </div>
      </div>
    `;
  charModal.style.display = "flex";
}

// Finds the demeanors in the data array and prevents rendering duplicate demeanor labels
function getDemeanorsArray(chars) {
  const demeanorsArray = [];
  for (let char of chars) {
    for (let demeanor of char.demeanorTags) {
      if (!demeanorsArray.includes(demeanor)) {
        demeanorsArray.push(demeanor);
      }
    }
  }
  return demeanorsArray;
}

// Renders the individual radio buttons to the page passing in the demeanors found with the getDemeanorsArray() function
function renderDemeanorRadios(chars) {
  let radioItems = ``;
  const demeanors = getDemeanorsArray(chars);
  for (let demeanor of demeanors) {
    radioItems += `
        <div class="radio">
        <label for="${demeanor}">${demeanor}</label>
            <input
                type="radio"
                id="${demeanor}"
                value="${demeanor}"
                name="demeanors"
            >
        </div>
    `;
  }
  demeanorRadios.innerHTML = radioItems;
}

// passes data to be incorporated into app
renderDemeanorRadios(npcsData);
