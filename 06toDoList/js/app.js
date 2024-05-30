// icones : ✔️ 🖊️ 🗑️ ✅

const saisie = document.querySelector("#saisie");
const btnSaisie = document.querySelector("#input label");
const liste = document.querySelector("#liste ol");
const modale = document.querySelector("#modale");
const btnOkModale = modale.querySelector("#oui");
const btnNokModale = modale.querySelector("#non");
const toDoArray = [];
let listenersModify = [],
listenersCheck = [],
listenersTrash = [];
let modifyValue = false;
let indexToModify = -1;


// Bidouillage approximatif pour calculer le nombre de caractères par ligne.
const iconesWidth = 16 + 96;
const sizeOfaChar = 12;
let pWidth = liste.clientWidth - iconesWidth;
let nbCharPerLine = (pWidth, pWidth / sizeOfaChar);



/**
 * Removes a task from the toDoArray.
 * @param {number} target - The index of the task to be removed.
 */
const removeTask = (target) => {
  modale.style.display = "none";
  toDoArray.splice(target, 1);
};

/**
 * Event listener for the "btnNokModale" button click event.
 * Hides the "modale" element and calls the "displayListe" function.
 */
btnNokModale.addEventListener("click", () => {
  modale.style.display = "none";
  displayListe();
});
/**
 * Event listener for the "Ok" button in the modal.
 * Removes a task from the list and updates the display.
 */
btnOkModale.addEventListener("click", () => {
  const indexToDelete = modale.querySelector("#indexToDelete");
  removeTask(indexToDelete.value);
  displayListe();
});

/**
 * Attaches event listeners to elements with specific classes.
 */
const listeners = () => {
  listenersCheck = document.querySelectorAll(".check");
  listenersModify = document.querySelectorAll(".modify");
  listenersTrash = document.querySelectorAll(".trash");

  /**
   * Attaches click event listeners to each element in the listenersCheck array.
   * When an element is clicked, it toggles the 'done' property of the corresponding element in the toDoArray.
   * Finally, it calls the displayListe function to update the display.
   */
  listenersCheck.forEach((elt, index) => {
    elt.addEventListener("click", () => {
      toDoArray[index].done = !toDoArray[index].done;
      displayListe();
    });
  });

  listenersModify.forEach((elt, index) => {
    elt.addEventListener("click", () => {
      saisie.value = toDoArray[index].task;
      modifyValue = true;
      indexToModify = index;
    });
  });

  listenersTrash.forEach((elt, index) => {
    elt.addEventListener("click", () => {
      // Affichage fenetre modale
      modale.style.display = "block";
      const msgTask = modale.querySelector("#tache");
      msgTask.innerText = toDoArray[index].task;
      // Passage de l'index à supprimer dans la fenetre modale
      const indexToDelete = modale.querySelector("#indexToDelete");
      indexToDelete.value = index;
    });
  });
};

/**
 * Displays the list of tasks on the webpage.
 */
const displayListe = () => {
  liste.innerHTML = "";
  saisie.value = "";
  let tache;
  toDoArray.forEach((elt) => {
    tache = elt.task;
    // if (tache.length >= 55) {
    if (tache.length >= Math.round(nbCharPerLine)) {
    //   tache = elt.task.slice(0, 55);
      tache = elt.task.slice(0, Math.round(nbCharPerLine));
      tache += "...";
    }
    let openTag = "<p>";
    let closeTag = "</p>";
    if (elt.done) {
      openTag = "<strike>";
      closeTag = "</strike>";
    }
    liste.innerHTML += `<li>${openTag}${tache}${closeTag}<span><p class='check'>✅</p><p class='modify'>🖊️</p><p class='trash'>🗑️</p></span></li>`;
    listeners();
  });
};

/**
 * Event listener for the "click" event on the btnSaisie button.
 * Adds a new task to the toDoArray or modifies an existing task based on the current state.
 */
btnSaisie.addEventListener("click", () => {
  if (saisie.value != "" && modifyValue === false) {
    toDoArray.push({ task: saisie.value, done: false });
    displayListe();
  } else if (
    saisie.value != "" &&
    modifyValue === true &&
    indexToModify != -1
  ) {
    toDoArray[indexToModify].task = saisie.value;
    modifyValue = false;
    indexToModify = -1;
    displayListe();
  } else {
    console.warn("Rien à faire ???");
  }
});


