import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import "./TodoStyles.scss";

const Todo = ({ todos, setTodos }) => {
  const [temp, setTemp] = useState("");
  const [indexEdit, setIndexEdit] = useState(-1);

  useEffect(async () => {
    await axios.get("http://localhost:8000/allTasks").then((res) => {
      setTodos(res.data.data);
    });
  }, []);

  const doneElement = async (index) => {
    if (temp) {
      todos[index].text = temp;
      const { _id, text } = todos[index];
      await axios
        .patch(`http://localhost:8000/updateTask`, {
          _id,
          text,
        })
        .then((res) => {
          setTodos(res.data.data);
        });
      setTemp("");
    }
    setIndexEdit(-1);
  };

  const checkboxChange = async (index) => {
    todos[index].isCheck = !todos[index].isCheck;
    const { _id, isCheck } = todos[index];
    await axios
      .patch(`http://localhost:8000/updateTask`, {
        _id,
        isCheck,
      })
      .then((res) => {
        setTodos(res.data.data);
      });
  };

  const removeTask = async (index) => {
    await axios
      .delete(`http://localhost:8000/deleteTask?_id=${todos[index]._id}`)
      .then((res) => {
        setTodos(res.data.data);
      });
  };

  const changeTempEdit = (e) => {
    if (e.target.value) {
      setTemp(e.target.value);
    }
  };

  const cancelElement = () => {
    setIndexEdit(-1);
  };

  const tempEditEnter = (e, index) => {
    if (e.key === "Enter") {
      doneElement(index);
      e.target.blur();
    }
  };

  const editElement = (index) => {
    setIndexEdit(index);
    setTemp(todos[index].text);
  };

  todos.sort((a, b) =>
    a.isCheck > b.isCheck ? 1 : a.isCheck < b.isCheck ? -1 : 0
  );

  return (
    <div className="item-todo">
      {todos.map((task, index) => (
        <div key={`task-${index}`} className="tasks">
          <Checkbox
            checked={task.isCheck}
            onChange={() => checkboxChange(index)}
            inputProps={{ "aria-label": "primary checkbox" }}
            className="checkbox"
          />
          {index === indexEdit ? (
            <div className="editInput">
              <textarea onChange={changeTempEdit} value={temp} />
              <div className="buttons">
                <Button variant="contained" onClick={() => doneElement(index)}>
                  Сохранить
                </Button>
                <Button
                  variant="contained"
                  onClick={(e) => cancelElement(e, index)}
                >
                  Отменить
                </Button>
              </div>
            </div>
          ) : (
            <div className="task">
              <p className={task.isCheck ? "done-text text-task" : "text-task"}>
                {task.text}
              </p>
              <div className="buttons">
                <Button variant="contained" onClick={() => removeTask(index)}>
                  Удалить
                </Button>
                <Button variant="contained" onClick={() => editElement(index)}>
                  Изменить
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Todo;
