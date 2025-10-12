import React, { useEffect, useState } from "react";
import axios from "axios";

const Assignment4 = () => {
  const [data, setData] = useState(null);
  const username = "pranavjinturkar";

  useEffect(() => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((r) => {
        setData(r.data);
        console.log(r.data);
      })
      .catch((err) => alert(err.message));
  }, []);

  if (!data)
    return (
      <div className="w-full h-screen flex items-center justify-center text-white text-lg">
        Loading...
      </div>
    );

  const {
    avatar_url,
    name,
    login,
    bio,
    followers,
    following,
    public_repos,
    html_url,
    location,
  } = data;

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-96 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 flex flex-col items-center text-white border border-white/20 hover:scale-105 transition-transform duration-300">
        {/* Profile Image */}
        <div className="relative">
          <img
            src={avatar_url}
            alt={name}
            className="w-32 h-32 rounded-full border-4 border-emerald-400 shadow-lg"
          />
          <span className="absolute bottom-2 right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></span>
        </div>

        {/* Name & Username */}
        <h1 className="text-2xl font-semibold mt-4">{name || "No Name"}</h1>
        <p className="text-gray-400">@{login}</p>

        {/* Bio */}
        {bio && (
          <p className="mt-2 text-center text-gray-300 text-sm px-4">{bio}</p>
        )}

        {/*  */}
        {location && (
          <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
            📍 {location}
          </p>
        )}

        {/* Stats */}
        <div className="flex justify-around items-center w-full mt-5 bg-white/10 rounded-lg py-3">
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">{followers}</h3>
            <p className="text-gray-400 text-sm">Followers</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">{following}</h3>
            <p className="text-gray-400 text-sm">Following</p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold">{public_repos}</h3>
            <p className="text-gray-400 text-sm">Repos</p>
          </div>
        </div>

        {/* Profile Button */}
        <a
          href={html_url}
          target="_blank"
          rel="noreferrer"
          className="mt-6 w-full text-center bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 rounded-lg transition-colors duration-300"
        >
          View GitHub Profile
        </a>
      </div>
    </div>
  );
};

export default Assignment4;
