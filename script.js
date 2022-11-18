const customers = [
  {
    id: 0,
    name: "Anna Smith",
    age: 35,
    sex: "F",
    address: {
      street: "Downing st.",
      number: 5,
      code: "00-950",
      country: "GB",
    },
  },
  {
    id: 1,
    name: "Frank Lemon",
    age: 24,
    sex: "M",
    address: {
      street: "Park ave.",
      number: 45,
      code: "00-850",
      country: "USA",
    },
  },
  {
    id: 2,
    name: "Leon Smith",
    age: 61,
    sex: "M",
    address: {
      street: "Calsbourg Park",
      number: 17,
      code: "99-870",
      country: "GB",
    },
  },
  {
    id: 3,
    name: "William Henderson",
    age: 41,
    sex: "M",
    address: {
      street: "4th ave.",
      number: 53,
      code: "55-091",
      country: "USA",
    },
  },
  {
    id: 4,
    name: "Carol Johnson",
    age: 14,
    sex: "F",
    address: {
      street: "Downing st.",
      number: 5,
      code: "00-950",
      country: "GB",
    },
  },
  {
    id: 0,
    name: "Anna",
    age: 35,
    sex: "F",
    address: {
      street: "Blackburry st.",
      number: 8,
      code: "77-451",
      country: "USA",
    },
  },
];

const log = (param, text = "RESULT: ") => {
  console.log(text, param);
};

const customersCopy = [...customers];

log(customersCopy === customers); //false
log(customersCopy[1] === customers[1]); // true

const customersDeepCopy = structuredClone(customers);

log(customersDeepCopy === customers); //false
log(customersDeepCopy[1] === customers[1]); // false

//FIND
log(
  customers.find((c) => c.name === "Anna Smith"),
  "Found a customer: "
); // Returns an object
log(
  customers.find((c) => c.name === "Helen Smith"),
  "No such customer: "
); // Returns undefined

//FILTER - to find more than one matching element
log(
  customers.filter((c) => c.address.country === "USA"),
  "US only: "
); // New array of 3 elements BUT operations on it WILL mutate the original array!

const USAonly = customers.filter((c) => c.address.country === "USA");
USAonly[0].age = 0;
log(USAonly, "Here first customers age is mutated: "); // First customer is 0 yo
log(customers, "and here the first from the US - as well!!! "); // First customer form the USA is also 0 yo

// Why should we care? Because it's mutated for good:

customers.forEach((c) => log(c.age, "Original array is mutated for good: ")); // Original array is mutated after previous change.

//To avoid mutations of original always ude a deep copy of original array.

// Filter returns an array even if nothing matches:
const UScustomers = customers.filter((c) => c.address.country === "US");
log(UScustomers); //[]

//So what?
//So, if we try to check the result like:

if (UScustomers) {
  log(UScustomers, "The result of empty filter is TRUTHY!");
  // the condition will pass
}

//So if we try to access some values inside and do sth with it - it blows!
// if (res) {
//   res[1].age = 0; //TypeError!!!
// }

//Better check the array length:

if (UScustomers.length) {
  UScustomers[1].age = 0; //Nothing blows as we don't get past the condition
}

// SOME and EVERY:
// Check if we have females among out customers:

log(
  customers.some((c) => c.sex === "F"),
  "Are there any female customers? "
);

log(
  customers.every((c) => c.sex === "F"),
  "Are all of them ladies? "
);

log(
  customers.every((c) => c.address.country === "USA"),
  "Are all of them from the US? "
);

log(
  UScustomers.every((c) => c.address.country === "USA"),
  "And here? "
);

//Let's sort our customers by age:
let customersSorted = customers.sort((c) => c.age); // Doesn't work
log(customersSorted, "Ah, damn!");
//Why?
log([1, 4, 2, 12, 23, 8, 6].sort());
log(["banana", "apple", "stork", "bird", "sun"].sort());
//To make it ascending we need to:
customersSorted = customersDeepCopy.sort((a, b) => a.age - b.age);
log(customersSorted, "Sorted by age: ");

//MAP
//Lets get a list of names:
log(
  customers.map((c) => c.name),
  "Customers' names:"
);

// Lets make everybody older (MAP to change one value in an array of objects)
const olderCustomers = customers.map((c) => {
  const age = c.age + 20;
  return { ...c, age };
});

log(olderCustomers, "We grow old: ");

// REDUCE
// Lets find average age of our customers:

const averageAge = customersDeepCopy.reduce((totalAge, customer) => {
  return (totalAge += customer.age);
}, 0);

log(averageAge / customers.length, "Avg age of a customer: ");

// Let's check avg age of gentlemen only:
const avgAgeOfMaleCustomers = customersDeepCopy.reduce((totalAge, customer) => {
  if (customer.sex === "M") {
    totalAge += customer.age;
  }
  return totalAge;
}, 0);

const nrOfMen = customers.filter((c) => c.sex === "M").length;

log(avgAgeOfMaleCustomers / nrOfMen, "Gents are this old on average: ");

//Let's chain some methods:
// get average age of Men only and only those from the USA but in 20 years:

const myMixedResult =
  customersDeepCopy
    .filter((c) => c.sex === "M")
    .filter((c) => c.address.country === "USA")
    .map((c) => {
      const age = c.age + 20;
      return { ...c, age };
    })
    .reduce((totalAge, customer) => {
      return (totalAge += customer.age);
    }, 0) / 2;

log(myMixedResult, "Average age of US customers in 20 years will be: ");
