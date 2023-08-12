console.log("Its coffee time!");
const order = {
  coffees: [],
};
const allButtons = document.querySelectorAll(".addToOrderBtn");

allButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const coffeeId = e.srcElement.id;
    order.coffees.push(coffeeId);
  });
});

const submit = document.querySelector("#submit");

console.log(submit);
