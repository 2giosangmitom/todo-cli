import React from "react";
import { useTransition, animated } from "@react-spring/web";
import { Todo } from "../models";
import { AiFillDelete } from "react-icons/ai";
import styles from "../assets/css/SingleTodo.module.css";

type Props = {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, setTodos }: Props) => {
  const transition = useTransition(todo, {
    from: { x: 50, y: -500, opacity: 0 },
    enter: { x: 0, y: 0, opacity: 1 },
  });

  const handleDelete = (id: string) => {
    setTodos((prev) => {
      return prev.filter((value) => value.id !== id);
    });
  };

  return (
    <>
      {transition((style, item) => {
        return item ? (
          <animated.div className={styles.todo__single} style={style}>
            <span>{todo.todo}</span>
            <div>
              <span className={styles.icon} onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
              </span>
            </div>
          </animated.div>
        ) : (
          <div></div>
        );
      })}
    </>
  );
};

export default SingleTodo;
