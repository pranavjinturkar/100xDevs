import React, { useState } from "react";

const WORDS = [
  "shadow",
  "slave",
  "broken",
  "sword",
  "red",
  "flag",
  "green",
  "boring",
  "is",
  "on",
];

const Assignment3 = () => {
  return (
    <div className="w-full flex flex-col gap-8 items-center justify-center h-screen">
      <h1 className="text-3xl font-semibold">Text Generator</h1>
      <GenerateWords />
    </div>
  );
};

export default Assignment3;

const GenerateWords = () => {
  const [noOfWords, setNoOfWords] = useState(0);
  const [paragraph, setparagraph] = useState("");

  function generatePara() {
    let para = "";
    for (let i = 0; i < noOfWords; i++) {
      const word = WORDS[Math.floor(Math.random() * 10)];
      para += word;
      if (i < noOfWords - 1) {
        para += " ";
      }
    }
    setparagraph(para);
  }

  return (
    <div className="space-y-2 flex flex-col gap-4 items-center">
      <div className="flex items-center gap-4">
        <input
          type="number"
          value={noOfWords}
          onChange={(e) => setNoOfWords(e.target.value)}
          placeholder="Enter No of Words"
          min={0}
          className="px-4 py-3 border-2 border-white rounded-md bg-rose-600 outline-none"
        />
        <button
          className="px-4 py-3 border-2 border-white rounded-md bg-rose-600 cursor-pointer font-semibold"
          onClick={generatePara}
        >
          Generate
        </button>
      </div>
      {paragraph.length > 0 && (
        <div className="px-4 py-3 rounded-xl border-2 border-white w-xl">
          {paragraph}
        </div>
      )}
    </div>
  );
};
