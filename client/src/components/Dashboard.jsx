import React, { useState } from "react";

const Dashboard = ({name}) => {
  const [selected, setSelected] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-purple-200 p-6 md:p-10">
      <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-10 text-center tracking-tight">
        ✨ My Dashboard
      </h1>
      <h1>{name}</h1>
      <div className="flex justify-center">
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-12">
        {["dropdown", "input", "button"].map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`px-6 py-3 rounded-2xl font-medium transition-all shadow-md transform hover:-translate-y-1 hover:shadow-xl duration-300 w-[250px] sm:w-auto ${
              selected === option
                ? "bg-gradient-to-r from-blue-500 to-sky-500 text-white scale-105"
                : "bg-white text-gray-700 hover:bg-indigo-50"
            }`}
          >
            {option.charAt(0).toUpperCase() + option.slice(1)}
          </button>
        ))}
      </div>
      </div>

      <div className="max-w-lg mx-auto bg-white/70 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-10 border border-gray-200 transition-all">
        {selected === "dropdown" && (
          <div>
            <label className="block text-gray-700 mb-3 font-semibold">
              Choose an option:
            </label>
            <select className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-400 outline-none transition shadow-sm">
              <option>Select...</option>
              <option>Option A</option>
              <option>Option B</option>
              <option>Option C</option>
            </select>
          </div>
        )}

        {selected === "input" && (
          <div>
            <label className="block text-gray-700 mb-3 font-semibold">
              Enter Text:
            </label>
            <input
              type="text"
              placeholder="Type something..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:ring-2 focus:ring-sky-400 outline-none transition shadow-sm"
            />
          </div>
        )}

        {selected === "button" && (
          <div className="text-center">
            <button className="px-8 py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold shadow-lg hover:opacity-90 transform hover:scale-105 transition-all">
              Click Me 🚀
            </button>
          </div>
        )}

        {!selected && (
          <p className="text-gray-500 text-center font-medium">
            Please select an option above 👆
          </p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
