import { useState } from "react";
import "./App.css";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

function average(arr) {
  return arr.reduce((acc, ele) => acc + ele / arr.length, 0);
}

function App() {
  return (
    <div>
      <Navbar />
      <Main />
    </div>
  );
}

export default App;

function Navbar() {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <Numresults />
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span>🍿 usePopcorn</span>
    </div>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      type="text"
      className="search"
      placeholder="search movies ..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Numresults() {
  return (
    <p className="num-results">
      Found <strong>X</strong> results
    </p>
  );
}

function Main() {
  return (
    <main>
      <ListBox />
      <WatchedBox />
    </main>
  );
}

/////// list box section ....

function ListBox() {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((cur) => !cur)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && <MovieList />}
    </div>
  );
}

function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);
  return (
    <div className="list">
      {movies.map((ele) => (
        <Movie movie={ele} key={ele.imdbID} />
      ))}
    </div>
  );
}

function Movie({ movie }) {
  return (
    <div className="movie-card">
      <img height={150} src={movie.Poster} alt={`${movie.Title}`} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <span>📅</span>
        <span>{movie.Year}</span>
      </div>
    </div>
  );
}

///// watched box section ....

function WatchedBox() {
  const [isOpen2, setIsOpen2] = useState(true);
  const [watched, setWatched] = useState(tempWatchedData);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen2((cur) => !cur)}>
        {isOpen2 ? "-" : "+"}
      </button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched} />
          <WatchedMovieList />
        </>
      )}
    </div>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRunTime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div className="summary-info-container">
        <p>
          <span>*️⃣</span>
          <span>{watched.length} movies</span>
        </p>

        <p>
          <span>⭐</span>
          <span>{avgImdbRating}</span>
        </p>

        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>

        <p>
          <span>⌛</span>
          <span>{avgRunTime}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList() {
  return <div>watched movie list</div>;
}
