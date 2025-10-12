import React, { useState } from "react";

const Assignment6 = () => {
  const [name, setName] = useState("");
  const [generate, setGenerate] = useState(false);

  function handleGenerateBdCard() {
    if (!name.trim()) return;
    setGenerate(true);

    // // Clear input after a short delay, so cards get the name
    // setTimeout(() => setName(""), 100);
  }
  return (
    <div className="w-full flex items-center justify-center h-screen flex-col gap-8 bg-gradient-to-br from-rose-800 via-rose-400 to-rose-950">
      <div className="w-xl flex flex-col items-center p-8 bg-gradient-to-br to-rose-800 via-rose-400 from-rose-950 border-2 border-white rounded-lg shadow-xl gap-6">
        <h1 className="text-4xl text-white italic font-semibold font-sans">
          Enter your Name
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="outline-none w-full rounded-lg border-white border-2 shadow-lg px-4 py-3 text-lg font-semibold font-sans"
        />
        <button
          className="px-4 py-3 border-white border-2 rounded-lg shadow-lg text-lg font-semibold font-sans cursor-pointer hover:bg-white/10"
          onClick={handleGenerateBdCard}
        >
          Generate
        </button>
      </div>
      {generate && (
        <div className="w-full flex items-center justify-around">
          <BirthdayCard1 name={name} />
          <BirthdayCard2 name={name} />
          <BirthdayCard3 name={name} />
        </div>
      )}
    </div>
  );
};

export default Assignment6;

const BirthdayCard1 = ({ name }) => {
  return (
    <div className="w-80 p-6 rounded-2xl shadow-2xl bg-gradient-to-br from-pink-500 via-rose-400 to-red-600 text-white flex flex-col items-center gap-4 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold font-sans">Happy Birthday {name}!</h2>
      <p className="text-center font-medium">
        Wishing you a day filled with love, laughter, and joy!
      </p>
      <div className="text-6xl animate-bounce">🎂</div>
    </div>
  );
};

const BirthdayCard2 = ({ name }) => {
  return (
    <div className="w-80 p-6 rounded-2xl shadow-2xl bg-gradient-to-tr from-purple-500 via-pink-400 to-rose-500 text-white flex flex-col items-center gap-4 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold font-sans">Cheers to You {name}!</h2>
      <p className="text-center font-medium">
        May your day be as amazing and bright as your smile!
      </p>
      <div className="text-6xl animate-pulse">🎉</div>
    </div>
  );
};

const BirthdayCard3 = ({ name }) => {
  return (
    <div className="w-80 p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-rose-600 via-pink-400 to-rose-700 text-white flex flex-col items-center gap-4 transform hover:scale-105 transition-transform duration-300">
      <h2 className="text-2xl font-bold font-sans">Make a Wish {name}!</h2>
      <p className="text-center font-medium">
        Hope all your dreams come true today and always!
      </p>
      <div className="text-6xl animate-bounce">✨</div>
    </div>
  );
};
