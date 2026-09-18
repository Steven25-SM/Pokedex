import React, { useEffect, useState } from "react";
import axios from "axios";
import PokeCard from "./PokeCard";

function PokemonSearch() {
  const [pokemonList, setPokemonList] = useState([]);
  const [allPokemonNames, setAllPokemonNames] = useState([]);
  const [search, setSearch] = useState("");
  const [minWeight, setMinWeight] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  // Convierte la respuesta de PokeAPI al formato que usa PokeCard
  const formatPokemon = (pokemon) => ({
    id: pokemon.id,
    name: pokemon.name,
    img: pokemon.sprites.front_default,
    weight: pokemon.weight,
    types: pokemon.types.map((t) => t.type.name),
  });

  // Cargar catálogo inicial + nombres de todos los Pokémon
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Solo traemos los primeros 151 Pokémon con sus detalles
        const catalogResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        const catalogDetails = await Promise.all(
          catalogResponse.data.results.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return formatPokemon(response.data);
          })
        );

        setPokemonList(catalogDetails);

        // Una sola petición para obtener los nombres disponibles
        const namesResponse = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=2000"
        );

        setAllPokemonNames(namesResponse.data.results);

        // Obtener tipos
        const typeResponse = await axios.get(
          "https://pokeapi.co/api/v2/type"
        );

        setTypes(typeResponse.data.results.map((type) => type.name));

        setLoading(false);
      } catch (error) {
        console.error("Error cargando Pokémon:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Buscar Pokémon aunque esté fuera de los primeros 151
  useEffect(() => {
    const searchPokemon = async () => {
      const query = search.trim().toLowerCase();

      // Si no estamos buscando, mostramos el catálogo normal
      if (!query) {
        setSearchLoading(false);
        return;
      }

      setSearchLoading(true);

      try {
        // Buscamos por nombre dentro de la lista completa de nombres
        const matches = allPokemonNames
          .filter((pokemon) => pokemon.name.includes(query))
          .slice(0, 20);

        // Si no encontramos coincidencias
        if (matches.length === 0) {
          setPokemonList([]);
          setSearchLoading(false);
          return;
        }

        // Pedimos los detalles SOLO de los resultados encontrados
        const results = await Promise.all(
          matches.map(async (pokemon) => {
            const response = await axios.get(pokemon.url);
            return formatPokemon(response.data);
          })
        );

        setPokemonList(results);
      } catch (error) {
        console.error("Error buscando Pokémon:", error);
        setPokemonList([]);
      }

      setSearchLoading(false);
    };

    // Esperamos un poco para no hacer peticiones por cada tecla
    const timeout = setTimeout(searchPokemon, 400);

    return () => clearTimeout(timeout);
  }, [search, allPokemonNames]);

  // Cuando no hay búsqueda usamos el catálogo inicial
  const baseList = search.trim() ? pokemonList : pokemonList;

  const filtered = baseList
    .filter((pokemon) =>
      pokemon.name.includes(search.toLowerCase())
    )
    .filter((pokemon) =>
      minWeight ? pokemon.weight >= Number(minWeight) : true
    )
    .filter((pokemon) =>
      selectedType ? pokemon.types.includes(selectedType) : true
    )
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <section id="pokemon-catalog">
      {/* Filtros */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">

        {/* Buscar */}
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-slate-700 bg-[#161824] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
        />

        {/* Peso */}
        <input
          type="number"
          placeholder="Peso mínimo..."
          value={minWeight}
          onChange={(e) => setMinWeight(e.target.value)}
          className="rounded-xl border border-slate-700 bg-[#161824] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-yellow-400"
        />

        {/* Tipo */}
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="rounded-xl border border-slate-700 bg-[#161824] px-4 py-3 text-white outline-none focus:border-yellow-400"
        >
          <option value="">Todos los tipos</option>

          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Loading inicial */}
      {loading && (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-yellow-400" />

          <p className="text-slate-400">
            Cargando Pokémon...
          </p>
        </div>
      )}

      {/* Loading búsqueda */}
      {!loading && searchLoading && (
        <div className="py-10 text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-700 border-t-yellow-400" />

          <p className="text-slate-400">
            Buscando Pokémon...
          </p>
        </div>
      )}

      {/* Resultados */}
      {!loading && !searchLoading && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((pokemon) => (
            <PokeCard
              key={pokemon.id}
              pokemon={pokemon}
            />
          ))}
        </div>
      )}

      {/* Sin resultados */}
      {!loading && !searchLoading && filtered.length === 0 && (
        <div className="py-16 text-center">
          <p className="text-xl font-bold text-white">
            No encontramos ese Pokémon
          </p>

          <p className="mt-2 text-slate-500">
            Intenta con otro nombre.
          </p>
        </div>
      )}
    </section>
  );
}

export default PokemonSearch;