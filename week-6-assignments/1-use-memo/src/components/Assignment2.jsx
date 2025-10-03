import React, { useEffect, useMemo, useState } from "react";

// In this assignment, you will create a component that renders a large list of sentences and includes an input field for filtering these items.
// The goal is to use useMemo to optimize the filtering process, ensuring the list is only re-calculated when necessary (e.g., when the filter criteria changes).
// You will learn something new here, specifically how you have to pass more than one value in the dependency array

// You have array of words
// total_lines or total numbers you want to have
// and filter them

const words = [
  "broken",
  "sword",
  "changing",
  "star",
  "shadow",
  "lord",
  "prince",
  "of",
  "nothing",
  "kai",
];
const total_lines = 1000;
const ALL_SENTENCES = [];

for (let i = 0; i < total_lines; i++) {
  let sentence = "";
  for (let j = 0; j < words.length; j++) {
    sentence += words[Math.floor(Math.random() * words.length)];
    sentence += " ";
  }
  ALL_SENTENCES.push(sentence);
}

export function Assignment2() {
  const [sentences, setSentences] = useState(ALL_SENTENCES);
  const [input, setInput] = useState("");

  const filteredSentences = useMemo(() => {
    return sentences.filter((sentence) => sentence.includes(input));
  }, [sentences, input]);
  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      {filteredSentences.map((item, index) => (
        <div key={index}>{item}</div>
      ))}
    </div>
  );
}
