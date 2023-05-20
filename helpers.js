// // Write two functions called `capitalize` and `calculateCalories`

// // The capitalize function should upper case the first character of the word it
// // receives and lowercase the rest.
// export const capitalize = (word) => {
//     if (typeof word !== "string") return "";
//     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
// };

// // The calculateCalories function should take in three parameters: carbsValue,
// // proteinValue, and fatValue. The function should return the total number of
// // calories.
// export const calculateCalories = (carbsValue, proteinValue, fatValue) => {
//     const carbsNum = parseFloat(carbsValue);
//     const proteinNum = parseFloat(proteinValue);
//     const fatNum = parseFloat(fatValue);

//     if (isNaN(carbsNum) || isNaN(proteinNum) || isNaN(fatNum)) {
//         console.log("not a number!");
//         return "not a number!";
//     }

//     const totalCalories = carbsNum * 4 + proteinNum * 4 + fatNum * 9;
//     return totalCalories;
// };

export const capitalize = (word) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
};

export const calculateCalories = (carbs = 0, protein = 0, fat = 0) => {
    return carbs * 4 + protein * 4 + fat * 9;
};
