import express from "express";
import jwt from "jsonwebtoken";
const jwtPass = "123456";

const app = express();

// Body Parsing
app.use(express.json());

const ALL_USERS = [
  {
    username: "harkirat@gmail.com",
    password: "123",
    name: "harkirat singh",
  },
  {
    username: "raman@gmail.com",
    password: "123321",
    name: "Raman singh",
  },
  {
    username: "priya@gmail.com",
    password: "123321",
    name: "Priya kumari",
  },
];

function userExists(username, password) {
  // Returns a boolean, preferred method for this fn
  return ALL_USERS.some((user) => user.username == username);
}

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  if (!userExists)
    return res.status(403).json({
      msg: "User Doesn't exist for our user",
    });

  // Signs the jwt (creation => payload + jwt_secret_key + valid till)
  const token = jwt.sign({ username }, jwtPass, {
    expiresIn: "10h",
  });

  return res.status(200).json({
    token,
  });
});

app.get("/users", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      msg: "No token provided",
      success: false,
    });
  }
  try {
    // JWT Verification : token, secret_key
    const decoded = jwt.verify(token, jwtPass);
    const username = decoded.username;

    const allUsers = ALL_USERS.filter((user) => user.username != username);

    return res.status(200).json(allUsers);
  } catch (error) {
    return res.status(403).json({
      msg: "Invalid Token",
    });
  }
});

app.listen(3000, () => console.log("Server Running on Port 3000!"));
