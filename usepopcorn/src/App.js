import { use, useEffect, useState } from "react";
import "./App.css";
import StartRating from "./StartRating";

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
      setSelectedId((cur)=> cur === id ? null : id)
    }


    function handleCloseMovie (){
      setSelectedId(null)
    }

    function handleAddWatched (movie){
     setWatched((cur)=> [...cur , movie])
    }

    function handleDeleteWatched (id){
      setWatched((cur)=> cur.filter((ele)=> ele.imdbID !== id) )
    }




  useEffect(function () {
    const controller = new AbortController()
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("")
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}` ,
          {signal : controller.signal}
        );
      

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error ("Movie not found !!")
        }
    
        setMovies(data.Search);
        setError("")
       
      } catch (err) {
        setError(err.message);
            if (err.name !== "AbortError") {
        setError(err.message)
      }
      } 

  
       
  
      finally{
      setIsLoading(false);
      }
    }

    if(query.length < 3 ){
      setMovies([])
      setError("")
      return ;
    }



    fetchMovies();

    return function (){
      controller.abort()
    }


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
          <MovieDetails 
          selectedId={selectedId}
          onCloseMovie={handleCloseMovie}
          onAddWatched={handleAddWatched}
          watched={watched}
         
          />  : 
       <>
           <WatchedSummary watched={watched} />
           <WatchedMovieList watched={watched} onDeleteWatched={handleDeleteWatched} />
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

function MovieDetails ({selectedId , onCloseMovie , onAddWatched , watched}){
const [movie , setMovie] = useState({})
const [isLoading , setIsLoading] = useState(false) ; 
const [userRating , setUserRating] = useState("")

const isWatched = watched.map((movie)=> movie.imdbID).includes(selectedId)  

const watchedUserRating = watched.find((movie)=> movie.imdbID === selectedId)?.userRating

const {
Title : title , 
Year : year , 
Poster : poster , 
Runtime : runtime ,
Actors : actors , 
Director : director , 
Genre : genre  , 
imdbRating ,
Plot : plot , 
Released : released
} = movie
  
function handleAdd (){
  const newWatchedMovie = {
    imdbID : selectedId ,
    title , 
    year , 
    poster ,
    imdbRating : Number(imdbRating) , 
    runtime : Number(runtime.split(" ")[0]) , 
    userRating
  }
  onAddWatched(newWatchedMovie)
  onCloseMovie()

}

     useEffect (function (){
function callback(e){
  if (e.code === "Escape"){
    onCloseMovie()
    console.log("Closing")
  }
}

      document.addEventListener("keydown" , callback)


      return function(){
        document.removeEventListener("keydown" , callback)
      }
     },[onCloseMovie])


  useEffect(function(){
    async function getMovieDetails (){
      setIsLoading(true)
      const res = await fetch (`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json()   ;
 
      setMovie(data)
      setIsLoading(false)
     }
    getMovieDetails()
  },[selectedId])


  useEffect(function(){
    if (!title) return ;
  document.title = `Movie | ${title}`
   
  //////  clean up function (anmount) :: 
 return function (){
  document.title = "usePopcorn"

 }

  },[title])

return <div className="details">
{isLoading ? <Loader/> : <>
<button onClick={onCloseMovie} className="btn-close">&larr;</button>
<div className="movie-details-container">
<img height={250} src={poster} alt={title}/>
<div className="movie-details-header">
 <h4>{title}</h4>
 <p>{released} - {runtime}</p>
 <p>{genre}</p>
 <p>⭐ {imdbRating} IMDB rating</p>
</div>
</div>

<div className="rating">

  {!isWatched ?   <>
 <StartRating maxRating={10} size={24} onSetRating={setUserRating} />

 {userRating && 
  <button className="btn-add" onClick={handleAdd}>
  +Add to list
 </button>
 }
  
  </>  : <p>You rated this movie with {watchedUserRating} ⭐</p>}


</div>

<div className="movie-details-footer">
  <p className="plot">
  {plot}
  </p>
  
  <p>
    <strong>Starring :</strong>
    {actors}
  </p>
  
  <p>
    <strong>Directed by : </strong>
    {director}
  </p>
</div >

</>}

</div>
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
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>

        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>

        <p>
          <span>⌛</span>
          <span>{avgRunTime.toFixed(0)}</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovieList({ watched , onDeleteWatched}) {
  return (
    <div className="list">
      {watched.map((movie) => (
        <Watchedmovie movie={movie} 
        key={movie.imdbID}
        onDeleteWatched={onDeleteWatched}
        />
      ))}
    </div>
  );
}



function Watchedmovie({ movie , onDeleteWatched}) {
  return (
    <div className="watched-movie-container" >
      <img height={150} src={movie.poster} alt={`${movie.title}`} />
      <div className="watched-movie-info">
        <h3>{movie.title}</h3>
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
      <button onClick={()=> onDeleteWatched(movie.imdbID)} className="btn-delete" >❌</button>
    </div>
  );
}
