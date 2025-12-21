import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import StartRating from './StartRating';

function Test () {
  const [movieRating , setMovieRating] = useState(0)
  return <div>
<StartRating color='blue' defaultRating={3} onSetRating={setMovieRating}/>
<p>This movie was rated {movieRating} stars</p>
  </div> 
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}

    <StartRating
    
     color='red' 
     size={70}
      className="test"
      maxRating={8}
      messages = {["Terrible" , "Bad" , "Okay" , "Good" , "Amazing"]}
      
      />
      <StartRating size={60} maxRating={10} color='purple' defaultRating={3} />
      <Test/>
  
  </React.StrictMode>
);


