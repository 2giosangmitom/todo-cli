import React from "react";
import styles from "../assets/css/InputField.module.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form className={styles.input} onSubmit={e => handleAdd(e)}>
      <input
        onChange={(e) => setTodo(e.target.value)}
        value={todo}
        className={styles.input__box}
        type='text'
        placeholder='Enter a task'
      />
      <button className={styles.input__submit} type='submit'>
        Go
      </button>
    </form>
  );
};

export default InputField;
