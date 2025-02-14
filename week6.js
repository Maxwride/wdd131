//  arrays.js
const steps = ["one", "two", "three"];
function listTemplate(step) {
  return //the html string made from step
}
const stepsHtml = steps.map(listTemplate);
document.querySelector("#myList").innerHTML = stepsHtml

