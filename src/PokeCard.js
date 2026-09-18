import React from "react";

function PokeCard({ pokemon }) {
  const typeColors = {
    grass: "bg-green-500/80",
    poison: "bg-purple-600/80",
    fire: "bg-red-500/80",
    water: "bg-blue-500/80",
    bug: "bg-lime-500/80",
    normal: "bg-slate-500/80",
    electric: "bg-yellow-400 text-black",
    ground: "bg-orange-500/80",
    fairy: "bg-pink-400/80",
    fighting: "bg-red-700/80",
    psychic: "bg-pink-600/80",
    rock: "bg-stone-600/80",
    ghost: "bg-indigo-600/80",
    ice: "bg-cyan-400/80",
    dragon: "bg-violet-700/80",
    dark: "bg-slate-800",
    steel: "bg-gray-500/80",
    flying: "bg-sky-400/80",
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-[#161824] p-5 transition duration-300 hover:-translate-y-2 hover:border-yellow-400/40 hover:shadow-xl hover:shadow-black/30">

      {/* ID */}
      <div className="absolute right-4 top-4 rounded-full bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-400">
        #{String(pokemon.id || "").padStart(3, "0")}
      </div>

      {/* Imagen */}
      <div className="flex h-52 items-center justify-center rounded-xl bg-gradient-to-b from-slate-800/60 to-transparent">
        <img
          src={pokemon.img}
          alt={pokemon.name}
          className="h-44 w-44 object-contain transition duration-300 group-hover:scale-110"
        />
      </div>

      {/* Información */}
      <div className="mt-5 text-center">

        <h3 className="text-xl font-extrabold capitalize text-white">
          {pokemon.name}
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Peso: {pokemon.weight}
        </p>

        {/* Tipos */}
        <div className="mt-4 flex justify-center gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-3 py-1 text-xs font-bold capitalize text-white ${
                typeColors[type] || "bg-slate-600"
              }`}
            >
              {type}
            </span>
          ))}
        </div>

      </div>
    </div>
  );
}

export default PokeCard;