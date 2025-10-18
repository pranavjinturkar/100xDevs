interface User {
  id: string;
  name: string;
  age: number;
  email: string;
  password: string;
  createdAt: Date;
}

// Pick lets you take out the keys/props you need and have them store in a different type,
// effecient for maintaining SSOT
type DisplayUserProp = Pick<User, "name" | "age">;

interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}

// Omit removes the keys you provide from the parent interface/type and return the modified Type
type TodoPreview = Omit<Todo, "title" | "description">;

function sumOfAge(user1: User, user2: User) {
  return user1.age + user2.age;
}

// console.log(
//   sumOfAge({ name: "hkirat", age: 10 }, { name: "Bacche", age: 20 })
// );

function displayUser(user: DisplayUserProp) {
  // Update User fn
  console.log(`Hello ${user.name}, Your age is ${user.age}!`);
}
displayUser({ name: "Pranav", age: 21 });

interface Config {
  endpoint: string;
  apiKey: string;
}

const config: Readonly<Config> = {
  apiKey: "adjf;kasdfkk",
  endpoint: "/abc",
};

// Readonly: utility type which makes the object/arr and its props readonly and it can't be changed
// this will throw and error...
// config.apiKey = "dsfads";

const names: Readonly<string[]> = ["dasf", "dsfaskf", "dfasda"];

// push() fn doesn't exist on names (readonly)
// names.push()

interface Studs {
  id: number;
  name: string;
}

const students: Record<string, Studs> = {
  pranav: { id: 1, name: "adfasdf" },
  riddhi: { id: 2, name: "dajdfja" },
};

// const Sensei: string = ["a", "b", "c"] as const;
type Sensei = "a" | "b" | "c";

// All three Sensei types are needed or else it will throw err
// const teachers: Record<Sensei, Studs> = {
//   a: { id: 1, name: "adfdsf" },
// };
