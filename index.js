const namespace = "ec53jim3"; // ec53jim3
const baseURL = `https://firestore.googleapis.com/v1/projects/jsdemo-3f387/databases/(default)/documents/`;
const url = `${baseURL}${namespace}`;
const form = document.querySelector("#create-form");

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
    console.log(data);

    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };

    // POST request to Firestore
    const response = await fetch(url, options);
    const responseData = await response.json();

    if (!responseData.error) {
        document.getElementById("create-form").reset();
    }

});
