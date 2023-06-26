import React from "react";
import { Todo } from "../models";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdOutlineDone } from "react-icons/md";
import styles from "../assets/css/SingleTodo.module.css";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, setTodos }: Props) => {
  const handleDelete = (id: number) => {
    setTodos((prev) => {
      return prev.filter((value) => value.id !== id);
    });
  };

  return (
    <form className={styles.todo__single}>
      <span>{todo.todo}</span>
      <div>
        <span className={styles.icon}>
          <AiFillEdit />
        </span>
        <span className={styles.icon} onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className={styles.icon}>
          <MdOutlineDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
