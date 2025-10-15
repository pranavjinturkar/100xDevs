// let x: number = 1;
// console.log(x);

function greet(firstName: string) {
  console.log("Hello", firstName + "!");
  return 10;
}

// greet("Pranav");

// Type inference
// function sum(a: number, b: number) {
//   return a + b;
// }

// console.log(sum(1, 3));

// function isLegal(age: number) {
//   return age >= 18;
// }

// console.log("Are they legal? ", isLegal(12));
// console.log("Are they legal? ", isLegal(20));

// async function runAfter2s(cb: () => void) {
//   // setTimeout(cb, 2000);
//   const a = cb();
//   console.log(a);
// }

// runAfter2s(() => greet("Pranav"));

// Interfaces ----

// interface User {
//   firstName: string;
//   lastName: string;
//   age: number;
// }

// function isLegal(user: User) {
//   return user.age >= 18;
// }

// const isOfAge = isLegal({
//   firstName: "Pranav",
//   lastName: "Jinturkar",
//   age: 19,
// });

// console.log(isOfAge);

// Types ---

// Similar as interface...
// for classes (generally interface),
// in types, we can do this... type Prop = string | number;
// but not in interface...
// also in types...we can do | and & (union and intersection of types)

// When to Use Which
// Use Types:
// For advanced scenarios requiring union types, intersections, or mapped types.
// When dealing with primitive types, tuples, or non-object-related types.
// Creating utility types using advanced features like conditional types.
// Use Interfaces:
// When defining the structure of objects or contracts for class implementations.
// Extending or implementing other interfaces.
// When consistency in object shape is a priority.

// Generics ---
// Most Imp Topic in TS
// It let's define a function with custom datatype...
// Which we can change it later according to our needs...
// eg: for now we've given it name as T
// then I think we should be able to specify it's type wherever we're using it!

function identity<T>(arg: T) {
  return arg;
}

const val1 = identity<string>("haha");
const val2 = identity<number>(2);

console.log(val1);
console.log(val2);

function getFirstElement<T>(arr: T[]) {
  return arr[0];
}

const el = getFirstElement<string>(["harkiratSingh", "ramanSingh"]);
console.log(el?.toUpperCase());

// Can also use User (type, interface instead of datatype)

type User = {
  username: string;
  password: string;
  name: string;
};

const user = getFirstElement<User>([
  { username: "da;kjf;a", password: "123456", name: "Pranav" },
]);

console.log(user);

// Generics are freaking great!
