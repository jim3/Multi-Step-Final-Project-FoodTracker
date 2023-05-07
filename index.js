import snackbar from "./snackbar.js";
import { capitalize } from "./helpers.js";
import { calculateCalories } from "./helpers.js";
// import snackbar from "./snackbar";

const namespace = "ec53jim3"; // ec53jim3
const baseURL = `https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/`;
const url = `${baseURL}${namespace}`;
const form = document.querySelector("#create-form");

snackbar.show("Food added successfully.")

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.querySelector("#create-name");
    const carbs = document.querySelector("#create-carbs");
    const protein = document.querySelector("#create-protein");
    const fat = document.querySelector("#create-fat");

    const data = {
        fields: {
            name: { stringValue: name.value },
            carbs: { integerValue: carbs.value },
            protein: { integerValue: protein.value },
            fat: { integerValue: fat.value },
        },
    };

    // POST request options: send POST request, HTTP header & json as a string to server
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    const response = await fetch(url, options); // get response from server
    const responseData = await response.json(); // convert response to json using json() method

    if (responseData) {
        snackbar.show("Food added successfully!");
    } else {
        snackbar.show("Some data is missing!");
    }

    if (!responseData.error) {
        document.getElementById("create-form").reset();
    }

    const insertHTML = `
    <li class="card">
    <div>
    <h3 class="name">NAME</h3>
    <div class="calories">0 calories</div>
    <ul class="macros">
      <li class="carbs"><div>Carbs</div><div class="value">CARBSg</div></li>
      <li class="protein"><div>Protein</div><div class="value">PROTEINg</div></li>
      <li class="fat"><div>Fat</div><div class="value">FATg</div></li>
    </ul>
    </div>
    </li>
`;

    const foodList = document.querySelector("#food-list");
    foodList.insertAdjacentHTML("beforeend", insertHTML);

    const nameElement = foodList.querySelector(".name");
    const carbsElement = foodList.querySelector(".carbs .value");
    const proteinElement = foodList.querySelector(".protein .value");
    const fatElement = foodList.querySelector(".fat .value");

    // capitalize the first letter of the name of the food
    nameElement.textContent = capitalize(responseData.fields.name.stringValue);

    // display the values of carbs, protein, and fat
    carbsElement.textContent = `${responseData.fields.carbs.integerValue}g`;
    proteinElement.textContent = `${responseData.fields.protein.integerValue}g`;
    fatElement.textContent = `${responseData.fields.fat.integerValue}g`;

    // get the values of carbs, protein, and fat
    const carbsValue = carbsElement.textContent;
    const proteinValue = proteinElement.textContent;
    const fatValue = fatElement.textContent;

    // convert the string to a number using `parseFloat()` method and calculate the total calories
    let totalCalories = calculateCalories(carbsValue, proteinValue, fatValue);

    // display the total calories in the DOM using `textContent` property
    const caloriesElement = foodList.querySelector(".calories");
    caloriesElement.textContent = `${totalCalories} calories`;
});
