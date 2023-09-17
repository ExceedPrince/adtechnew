import React from 'react';
import PropTypes from 'prop-types';
import { Button } from "../ui/button";
import { MinusSquare } from 'lucide-react';

const TodoCard = ({ context, setTodos }) => {

    function deleteTodo (id) {
        const matches = JSON.parse(localStorage.getItem("todoList")).filter((todo) => todo.id === id);

        if (matches.length === 0) {
          console.log("not exists!!!");
          return;
        }

        setTodos(prevState => prevState.filter((item) => item.id !== id));
    }

    return (
        <div id={context.id} className='todoCards' >
            <span className='todoContext'>{context.text}</span>
            <Button className='deleteBtn' onClick={() => deleteTodo(context.id)} variant="ghost" size="icon">
                <MinusSquare />
            </Button>
        </div>
    )
}

TodoCard.propTypes = {
    context: PropTypes.object.isRequired,
    setTodos: PropTypes.func.isRequired
};

export default TodoCard;
