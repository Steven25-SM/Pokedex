# Guía de Despliegue

## 📌 Requisitos

Antes de ejecutar o desplegar el proyecto, asegúrate de tener instalado:

* [Node.js](https://nodejs.org/)
* npm
* Git

Puedes comprobar las versiones con:

```bash
node -v
npm -v
git --version
```

---

## 💻 Ejecutar el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```


### 2. Instalar las dependencias

```bash
npm install
```

Este comando instala las dependencias definidas en `package.json`.

### 3. Ejecutar en desarrollo

```bash
npm start
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```

---

## 🔌 API utilizada

La aplicación obtiene la información de Pokémon mediante **PokeAPI**:

```text
https://pokeapi.co/
```

No es necesario configurar una API Key.

La aplicación realiza las peticiones directamente desde React mediante Axios.

---

## 🔎 Funcionalidades

La aplicación permite:

* 🔍 Buscar Pokémon por nombre en tiempo real.
* 🔢 Buscar Pokémon mediante coincidencias de nombre.
* ⚖️ Filtrar por peso mínimo.
* 🏷️ Filtrar por tipo.
* 🔤 Mostrar resultados ordenados alfabéticamente.
* 🖼️ Mostrar imagen, nombre, ID, peso y tipos.
* 📱 Adaptarse a diferentes tamaños de pantalla.
* 🌐 Consultar Pokémon fuera del catálogo inicial mediante PokeAPI.

---

## 🏗️ Tecnologías

* **React**
* **JavaScript**
* **Axios**
* **Tailwind CSS**
* **PokeAPI**
* **HTML5**
* **CSS**

---

## 📁 Estructura principal

```text
ajax-react-lab/
│
├── public/
│
├── src/
│   ├── App.js
│   ├── PokemonSearch.js
│   ├── PokeCard.js
│   ├── DataLoader.js
│   ├── CharacterList.js
│   ├── CharacterLoader.js
│   ├── index.js
│   └── index.css
│
├── package.json
├── package-lock.json
└── README.md
```

> Algunos componentes como `CharacterList.js`, `CharacterLoader.js` y `DataLoader.js` corresponden a las prácticas realizadas durante el laboratorio y no forman parte directamente de la interfaz final de Pokémon.

---

## ⚠️ Consideraciones

La aplicación depende de PokeAPI para obtener los datos. Por lo tanto, si el servicio externo presenta una interrupción, cambios o limitaciones, algunas funcionalidades pueden verse afectadas.

El proyecto no almacena los Pokémon en una base de datos propia.

---
