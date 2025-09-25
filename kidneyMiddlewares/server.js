import express from "express";
import z from "zod";

// Find the average time your server is taking requests to handle requests

const app = express();

const kidSchema = z.enum(["1", "2"]);

const authSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
  country: z.literal("IN").or(z.literal("US")),
});

app.use(express.json());

let errorCount = 0;
let requestCount = 0;

let timeTaken = 0;
let avgTime = 0;
let allReqTime = [];

// Logic behind avg time for request handling
function avgTimeReqHandling() {
  allReqTime.push(timeTaken);
  avgTime = allReqTime.reduce((acc, init) => acc + init, 0) / allReqTime.length;
  return `Avg. Time for Request: ${avgTime.toFixed(2)}`;
}

// A barely passing auth check middleware...
function checkUser(req, res, next) {
  const username = req.headers.username;
  const password = req.headers.password;

  if (username != "admin" || password != "admin") {
    res.status(403).json({
      message: "User Doesn't exist",
      success: false,
    });
  }
  next();
}

// Consoles the time, a request takes to execute... don't know if it's right or wrong,
// but should be upto the mark for me
function avgTimeMiddleWare(req, res, next) {
  console.log(avgTimeReqHandling());
  next();
}

// Calculate Number of Requests, send by the user
function totalRequests(req, res, next) {
  requestCount++;
  console.log(requestCount);
  next();
}

app.use(checkUser);

app.get("/health-checkup", avgTimeMiddleWare, totalRequests, (req, res) => {
  timeTaken = 0;
  const startTime = performance.now(); // More Accurate
  //   const startTime = Date.now();
  const kidneyId = req.query.id;

  //   const resp = kidSchema.safeParse(kidneyId);
  //   if (resp.error) return res.json(resp);

  if (!kidneyId) {
    return res.status(400).json({
      msg: "Specify Kidney ID",
    });
  }

  if (parseInt(kidneyId) == 1 || parseInt(kidneyId) == 2) {
    res.json({
      message: "Your Kidney is fine sir! You may visit the doctor.",
    });
  } else {
    res.json({
      message:
        "Kidney Id is wrong... should be bw 1-2... anything else is irrelevant",
      success: false,
    });
  }
  const endTime = performance.now(); // More accurate
  //   const endTime = Date.now();
  timeTaken = endTime - startTime;
});

// Global Catch:
// It's a one time function...
// if something failed in webapp, which should not be exposed to the end user...
// then this function's role will come in place,
// which will handle errors for the user, and console the error in backend
app.use(function (err, req, res, next) {
  console.log(err);
  errorCount++;
  res.status(600).json({
    message: "Something is up on our server",
    success: false,
  });
});

app.listen(3000, console.log("Server Running on Port 3000!"));
