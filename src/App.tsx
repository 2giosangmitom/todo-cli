import React, { useState } from "react";
import { Todo } from "./models";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { todo: todo, isDone: false, id: Date.now() }]);
      setTodo("");
    }
  };

  return (
    <>
      <h1 className='heading'>Taskify</h1>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </>
  );
};

export default App;
