import React from "react";
import { useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./TodoFormStyles.scss";

const TodoForm = ({ todos, setTodos }) => {
  const [text, setText] = useState("");

  const addTask = async (text) => {
    if (text.trim()) {
      await axios
        .post("http://localhost:8000/createTask", {
          text,
          isCheck: false,
        })
        .then((res) => {
          setTodos(res.data.data);
        });
    }
  };

  const removeAllTasks = async () => {
    await axios.delete("http://localhost:8000/deleteAllTasks").then((res) => {
      setTodos(res.data.data);
    });
  };

  const taskChange = (e) => {
    setText(e.target.value);
  };

  const inputKeyPress = (e) => {
    if (e.key === "Enter") {
      clickSubmit();
    }
  };

  const clickSubmit = () => {
    addTask(text);
    setText("");
  };

  return (
    <header>
      <h1>Список задач: {todos.length}</h1>

      <div className="inputs">
        <TextField
          id="outlined-basic"
          label="To-Do"
          variant="outlined"
          value={text}
          type="text"
          onChange={taskChange}
          onKeyDown={inputKeyPress}
          placeholder="Введите значение"
        />
        <div className="buttons">
          <Button variant="contained" color="primary" onClick={clickSubmit}>
            Добавить
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={removeAllTasks}
          >
            Очистить
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TodoForm;
