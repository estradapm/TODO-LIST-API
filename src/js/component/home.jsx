import React from "react";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";
import TodoList from "./ToDoListApi";

//create your first component
const Home = () => {
	return (
	  <div>
		<TodoList />
	  </div>
	);
  };
  
  export default Home;
