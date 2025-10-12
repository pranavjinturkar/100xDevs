const socialMedia = [
  {
    quantity: 80,
    label: "Followers",
  },
  {
    quantity: 803,
    label: "Likes",
  },
  {
    quantity: 1.4,
    label: "Photos",
  },
];

const Assignment1 = () => {
  return (
    <div className="p-10 mx-auto w-fit">
      <Card />
    </div>
  );
};

export default Assignment1;

function Card() {
  return (
    <div className="w-md rounded-lg flex items-center justify-center flex-col text-black bg-white shadow-xl">
      <div className="relative w-full bg-gradient-to-r from-emerald-500 to-emerald-600 border border-white h-32 rounded-t-lg">
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 p-2 bg-white rounded-full">
          <img src="/vite.svg" alt="vite" />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-10 mb-2">
        <h1 className="text-2xl font-semibold font-serif">Rita Correia</h1>
        <p className="text-lg text-gray-600 font-semibold">32</p>
      </div>
      <h3 className="text-xl text-gray-500 font-semibold mb-4">London</h3>
      <div className="mb-4 bg-gray-300 w-full h-0.5" />
      <div className="mb-6 flex justify-around w-full items-center">
        {socialMedia.map((item, index) => (
          <div className="flex flex-col items-center" key={index}>
            <h3 className="font-semibold text-gray-800 text-xl">
              {item.quantity}K
            </h3>
            <p className="text-lg text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
