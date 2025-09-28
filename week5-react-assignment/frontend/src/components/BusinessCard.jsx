import React from "react";

const BusinessCard = ({ item }) => {
  const { name, description, interests, linkedIn = "", twitter = "" } = item;
  return (
    <div className="hover:scale-105 transition-all duration-300 w-xs p-4 py-6 rounded-lg shadow-sm bg-[#0077b6] flex flex-col items-start gap-2 text-white">
      <h1 className="text-xl font-serif font-semibold mb-1">{name}</h1>
      <p className="text-base italic">{description}</p>
      {/* Interests */}
      <div>
        <h3 className="text-lg font-serif font-semibold">Interests</h3>
        <ul className="space-y-1">
          {interests.map((interest, index) => (
            <li key={index} className="pl-2 text-sm">
              {interest}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4 mt-2">
        <a
          href={twitter}
          target="_blank"
          className="bg-[#caf0f8] text-black hover:bg-sky-300 transition-colors duration-200 px-3 py-2 rounded-md shadow-sm font-medium"
        >
          Twitter
        </a>
        <a
          href={linkedIn}
          target="_blank"
          className="bg-[#caf0f8] text-black hover:bg-sky-300 transition-colors duration-200 px-3 py-2 rounded-md shadow-sm font-medium"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default BusinessCard;
