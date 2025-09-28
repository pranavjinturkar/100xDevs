import { useState } from "react";
import BusinessCard from "../../components/BusinessCard";
import { ArrowDownFromLineIcon, Plus, Trash2 } from "lucide-react";

const BusinessDevs = () => {
  const [cards, setCards] = useState([
    {
      name: "Lokeshwar",
      description: "A TA in Cohort 2, 100xdevs",
      interests: ["Iconic", "Open Source", "App Dev"],
      linkedIn: "",
      twitter: "https://www.twitter.com",
    },
  ]);

  const [cardDetail, setCardDetail] = useState({
    name: "",
    description: "",
    interests: [],
    linkedIn: "",
    twitter: "",
  });
  const [interest, setInterest] = useState("");

  function handleAddInterest() {
    if (interest.trim().length === 0) return alert("Interest was empty");

    setCardDetail((prev) => ({
      ...prev,
      interests: [...cardDetail.interests, interest],
    }));
    setInterest("");
  }

  function handleDeleteInterest(interest) {
    const allInterests = cardDetail.interests.filter(
      (item) => item !== interest
    );
    setCardDetail((prev) => ({ ...prev, interests: allInterests }));
  }

  function handleAddCard() {
    if (cardDetail.description.trim().length === 0) {
      alert("description is Required");
      return;
    }
    if (cardDetail.name.trim().length === 0) {
      alert("name is Required");
      return;
    }
    if (cardDetail.twitter.trim().length === 0) {
      alert("twitter is Required");
      return;
    }
    if (cardDetail.linkedIn.trim().length === 0) {
      alert("linkedIn is Required");
      return;
    }
    if (cardDetail.interests.length === 0) {
      alert("interests is Required");
      return;
    }
    setCards((prev) => [...prev, cardDetail]);
    setCardDetail({
      name: "",
      description: "",
      interests: [],
      twitter: "",
      linkedIn: "",
    });
    setInterest("");
  }

  return (
    <div className="w-full min-h-screen bg-[#90e0ef] px-10 py-6">
      <h1 className="text-5xl text-center text-[#03045e] font-semibold font-serif mb-10">
        Your Daily Business Cards
      </h1>
      <div className="w-fit mx-auto my-10 grid grid-cols-4 place-items-center gap-x-6 gap-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={cardDetail.name}
          onChange={(e) =>
            setCardDetail((prev) => ({ ...prev, name: e.target.value }))
          }
          className="px-4 py-3 bg-cyan-500 rounded-md outline-none shadow-lg border-2 border-[#03045e] placeholder:text-[#03045e] font-semibold text-white placeholder:italic"
        />
        <input
          type="text"
          placeholder="About You"
          value={cardDetail.description}
          onChange={(e) =>
            setCardDetail((prev) => ({ ...prev, description: e.target.value }))
          }
          className="px-4 py-3 bg-cyan-500 rounded-md outline-none shadow-lg border-2 border-[#03045e] placeholder:text-[#03045e] font-semibold text-white placeholder:italic"
        />
        <input
          type="text"
          placeholder="Your Twitter username"
          value={cardDetail.twitter}
          onChange={(e) =>
            setCardDetail((prev) => ({ ...prev, twitter: e.target.value }))
          }
          className="px-4 py-3 bg-cyan-500 rounded-md outline-none shadow-lg border-2 border-[#03045e] placeholder:text-[#03045e] font-semibold text-white placeholder:italic"
        />

        <input
          type="text"
          placeholder="Your LinkedIn username"
          value={cardDetail.linkedIn}
          onChange={(e) =>
            setCardDetail((prev) => ({ ...prev, linkedIn: e.target.value }))
          }
          className="px-4 py-3 bg-cyan-500 rounded-md outline-none shadow-lg border-2 border-[#03045e] placeholder:text-[#03045e] font-semibold text-white placeholder:italic"
        />
        <div className="relative flex items-center gap-2 col-span-4">
          <input
            type="text"
            placeholder="Your Interests"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            className="px-4 py-3 bg-cyan-500 rounded-md outline-none shadow-lg border-2 border-[#03045e] placeholder:text-[#03045e] font-semibold text-white placeholder:italic"
          />
          <button
            className="px-4 py-3 rounded-md cursor-pointer bg-[#0077b6] hover:bg-[#0077b6]/90 duration-200 transition-colors active:bg-[#0077b6] text-white"
            onClick={handleAddInterest}
          >
            <Plus />
          </button>
        </div>
        {cardDetail.interests.length > 0 && (
          <div className="col-span-4 flex items-center gap-3 flex-wrap w-full">
            {cardDetail.interests.map((i, index) => (
              <InterestCard
                interest={i}
                key={index}
                handleDelete={handleDeleteInterest}
              />
            ))}
          </div>
        )}
        <button
          className="col-span-4 bg-[#0077b6] hover:bg-[#0077b6]/90 duration-200 transition-colors active:bg-[#0077b6] px-4 py-3 rounded-md shadow-md cursor-pointer text-white"
          onClick={handleAddCard}
        >
          Add Card
        </button>
      </div>

      <div className="w-full flex items-center gap-4 justify-center flex-wrap">
        {cards.map((item, index) => (
          <BusinessCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BusinessDevs;

const InterestCard = ({ interest, handleDelete }) => {
  return (
    <div className="rounded-full px-6 py-3 bg-[#14213d] text-white flex text-center gap-3">
      <p>{interest}</p>
      <Trash2
        className="hover:scale-105 transition-transform duration-200 cursor-pointer"
        onClick={() => handleDelete(interest)}
      />
    </div>
  );
};
