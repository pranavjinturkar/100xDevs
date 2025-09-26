import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
const jwtPassword = "abcdefghijklmnopqrstuvwxyz";

const logInSchema = z.object({
  username: z.email({ error: "Valid Email required" }),
  password: z.string().min(6, { error: "Min length required: 6" }),
});

const signInSchema = logInSchema.extend({
  name: z.string(),
});

const users = [];

const app = express();
app.use(express.json());

function signJwt(name, username, password, type) {
  let request;
  let checkUser;
  if (type === "signin") {
    request = signInSchema.safeParse({
      name,
      username,
      password,
    });
  } else {
    request = logInSchema.safeParse({
      username,
      password,
    });

    checkUser = users.filter((user) => user.username == username);
    if (checkUser.length == 0) {
      return res.status(400).json({
        err: "Not a user",
        success: false,
      });
    }
  }
  if (!request.success) {
    return {
      message: "Invalid Details",
      err: request.error,
      success: false,
    };
  }

  const token = jwt.sign({ username }, jwtPassword, {
    expiresIn: "3h",
  });
  // can later save it in local storage for easy access
  return { token, success: true };
}

function verifyJwt(req, res, next) {
  const token = req.headers.authorization;
  if (!token)
    return res.status(400).json({
      message: "no token Found",
      success: false,
    });
  try {
    jwt.verify(token, jwtPassword);
    req.user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token", success: false });
  }
}

// Decode Function, just give us the payload value of the token... it doesn't verify it!
function decodeJwt(token) {
  const decoded = jwt.decode(token);
  if (decoded) {
    return true;
  } else return false;
}

app.post("/sign-in", (req, res) => {
  const { name, username, password } = req.body;

  const isValid = signJwt(name, username, password, "signin");
  if (isValid.success) {
    res.status(200).json({
      message: "You've signed in successfully",
      success: true,
      token: isValid.token,
    });
    users.push({
      name,
      username,
      password,
    });
  } else {
    res.status(400).json(isValid);
  }
});

app.post("/log-in", (req, res) => {
  const { username, password } = req.body;
  const isValid = signJwt(null, username, password, "login");

  if (isValid.success) {
    res.status(200).json({
      message: "You've logged in successfully",
      success: isValid.success,
      token: isValid.token,
    });
  } else {
    res.status(400).json(isValid);
  }
});

app.get("/users", verifyJwt, (req, res) => {
  res.status(200).json({
    users,
  });
});

app.listen(3000, () => console.log("Running on PORT 3000!"));
