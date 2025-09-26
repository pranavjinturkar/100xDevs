import express from "express";

const app = express();

function checkRideTicket(req, res, next) {
  const ticketId = req.query.ticketId;

  if (!ticketId) return res.status(400).send("Please Enter your Ticket Id");

  if (ticketId.includes("id-")) {
    next();
  } else {
    return res.status(403).json({
      message: "Unauthorized access",
      success: false,
    });
  }
}

function checkIsOldEnough(req, res, next) {
  const age = req.query.age;
  if (!age) return res.status(400).send("Please Enter your Age");

  if (age >= 15) {
    next();
  } else {
    return res.status(403).json({
      message: "You're not of age, pls visit when you're 15+",
      success: false,
    });
  }
}

app.use(checkRideTicket);

app.get("/ride1", checkIsOldEnough, (req, res) => {
  res.json({
    msg: "You've successfully ridden Ride 1!",
    success: true,
  });
});

app.get("/ride2", (req, res) => {

  res.json({
    msg: "You've successfully ridden Ride 2!",
    success: true,
  });
});

app.listen(3000, () => console.log("Server Running on port 3000!"));
