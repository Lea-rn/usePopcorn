import { useEffect, useState } from "react";
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
const KEY = "d997c473";
function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
    const [query, setQuery] = useState("");
    const [selectedId , setSelectedId] = useState(null)
 
    
    // useEffect(function(){
    //   console.log("After initial render")
    // },[])

    // useEffect(function(){
    //   console.log("After every render")
    // })

    // console.log("During render ...")

    // useEffect(function(){
    //   console.log("D")
    // },[query])


    function handleSelectedMovie(id){
      setSelectedId(id)
    }




  useEffect(function () {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("")
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
      

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error ("Movie not found !!")
        }
      console.log(data.Search)
        setMovies(data.Search);
       
      } catch (err) {
        setError(err.message);
      } finally{
      setIsLoading(false);
      }
    }

    if(query.length < 3 ){
      setMovies([])
      setError("")
      return ;
    }



    fetchMovies();
  }, [query]);

  return (
    <div>
      <Navbar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Numresults movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectedMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? 
          <MovieDetails selectedId={selectedId}/>  : 
       <>
           <WatchedSummary watched={watched} />
           <WatchedMovieList watched={watched} />
       </>
          
        }
          
        </Box>
      </Main>
    </div>
  );
}

export default App;

function Loader() {
  return <p className="loader">LOADING .......</p>;
}

function ErrorMessage({ message }) {
  return <p className="error">⚠️{message}</p>;
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Logo() {
  return (
    <div className="logo">
      <span>🍿 usePopcorn</span>
    </div>
  );
}

function Search({query , setQuery}) {

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

function Numresults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}

/////// list box section ....

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((cur) => !cur)}>
        {isOpen ? "-" : "+"}
      </button>
      {isOpen && children}
    </div>
  );
}

function MovieList({ movies , onSelectMovie }) {
  return (
    <div className="list">
      {movies.map((ele) => (
        <Movie movie={ele} key={ele.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </div>
  );
}

function Movie({ movie , onSelectMovie }) {
  return (
    <div onClick={()=> onSelectMovie(movie.imdbID)} className="movie-card">
      <img height={150} src={movie.Poster} alt={`${movie.Title}`} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <span>📅</span>
        <span>{movie.Year}</span>
      </div>
    </div>
  );
}

function MovieDetails ({selectedId}){
return <div className="details">{selectedId}</div>
}

///// watched box section ....

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

function WatchedMovieList({ watched }) {
  return (
    <div className="list">
      {watched.map((movie) => (
        <Watchedmovie movie={movie} key={movie.imdbID} />
      ))}
    </div>
  );
}

//  {
//     imdbID: "tt1375666",
//     Title: "Inception",
//     Year: "2010",
//     Poster:
//       "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10,
//   },

function Watchedmovie({ movie }) {
  return (
    <div className="watched-movie-container">
      <img height={150} src={movie.Poster} alt={`${movie.Title}`} />
      <div className="watched-movie-info">
        <h3>{movie.Title}</h3>
        <div className="watched-movie-child-info">
          <p>
            <span>⭐</span>
            <span>{movie.imdbRating}</span>
          </p>
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>

          <p>
            <span>⌛</span>
            <span>{movie.runtime}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
