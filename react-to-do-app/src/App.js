import React from "react";
import { useState } from "react";
import Todo from "./Components/Todo/Todo";
import TodoForm from "./Components/TodoForm/TodoForm";
import "./AppStyles.scss";

const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <TodoForm todos={todos} setTodos={setTodos} />
      <Todo todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
