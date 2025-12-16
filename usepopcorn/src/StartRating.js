export default function  StartRating (){
    return <div> 
   {
    Array.from({length:5},(_,i)=> (
        <span>S{i+1}</span>
    ))
   }



    </div>
}