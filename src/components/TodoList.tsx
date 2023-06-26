import React from "react";
import { Todo } from "../models";
import SingleTodo from "./SingleTodo";
import styles from "../assets/css/TodoList.module.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
  return (
    <div className={styles.todos}>
      {todos.map((todo) => (
        <SingleTodo todo={todo} key={todo.id} setTodos={setTodos} />
      ))}
    </div>
  );
};

export default TodoList;
