function Challange() {
  return (
    <div className="App">
   <TextExpander>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum optio non et
    expedita nam recusandae, laborum natus quaerat veritatis ad praesentium
    sint. Distinctio, repellat. Eaque earum sequi rerum asperiores odio
    laboriosam voluptas labore libero, voluptate, repellat deleniti dolore vero
    alias repudiandae? Nobis eius totam laboriosam necessitatibus assumenda
    delectus quos repellendus?
   </TextExpander>

      <TextExpander
      collapseNumWords={20}
      expandButtonText="SHow text"
      collapseButtonText="Collapse text"
      buttonColor="#ff6622"
      >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum optio non et
    expedita nam recusandae, laborum natus quaerat veritatis ad praesentium
    sint. Distinctio, repellat. Eaque earum sequi rerum asperiores odio
    laboriosam voluptas labore libero, voluptate, repellat deleniti dolore vero
    alias repudiandae? Nobis eius totam laboriosam necessitatibus assumenda
    delectus quos repellendus?
   </TextExpander>

      <TextExpander expanded={true} className="box">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum optio non et
    expedita nam recusandae, laborum natus quaerat veritatis ad praesentium
    sint. Distinctio, repellat. Eaque earum sequi rerum asperiores odio
    laboriosam voluptas labore libero, voluptate, repellat deleniti dolore vero
    alias repudiandae? Nobis eius totam laboriosam necessitatibus assumenda
    delectus quos repellendus?
   </TextExpander>
    </div>
  );
}

export default Challange;


function TextExpander({
  collapseNumWords , 
  expandButtonText , 
  collapseButtonText , 
  buttonColor ,
  expanded , 
  className , 
  children
}){
  return <h1>todo</h1>
}