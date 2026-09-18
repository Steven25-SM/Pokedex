import React from "react";
import PokemonSearch from "./PokemonSearch";

function App() {
  return (
    <div className="min-h-screen bg-[#0d0f17] text-white">
      {/* Header */}
      <header className="border-b-2 border-yellow-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          {/* Logo */}
          <a
            href="#inicio"
            className="flex items-center gap-3 no-underline"
          >
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src="/pokeico.png"
                alt="Pokemon"
                className="h-10 w-10 object-contain"
              />
            </div>

            <span className="text-2xl font-extrabold tracking-tight text-white">
              Pokedex
            </span>
          </a>

          {/* Navegación */}
          <nav className="flex items-center gap-3">

            {/* Home → Inicio */}
            <a
              href="#inicio"
              className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white no-underline"
            >
              Home
            </a>

            {/* Browse → Catálogo */}
            <a
              href="#catalogo"
              className="rounded-xl px-5 py-2.5 text-slate-400 no-underline transition hover:bg-slate-800 hover:text-white"
            >
              Browse
            </a>

          </nav>
        </div>
      </header>

      <main
        id="inicio"
        className="mx-auto max-w-7xl px-6 py-12"
      >
        {/* Hero */}
        <section className="mb-14 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-yellow-400">
            ✨ Discover the world of Pokemon ✨
          </p>

          <h1 className="text-4xl font-extrabold md:text-6xl">
            Find Your Favorite
            <span className="block text-yellow-400">Pokemon</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-slate-400">
            Search, explore and discover information about your favorite
            Pokémon.
          </p>
        </section>

        {/* Catálogo */}
        <section id="catalogo" className="scroll-mt-24">
          <PokemonSearch />
        </section>
      </main>
    </div>
  );
}

export default App;

