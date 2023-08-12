console.log("Its coffee time!");
let order = {
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

submit.addEventListener("click", async (e) => {
  let res = await fetch("/coffee/order", {
    method: "POST",
    body: JSON.stringify(order),
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  let response = await res.json();
  if (response) {
    order = {
      coffees: [],
    };
    window.location = `/coffee/order/${response._id}`;
  }
  //   console.log(response);
});
