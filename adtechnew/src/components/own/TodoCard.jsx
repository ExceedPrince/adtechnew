import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { MinusSquare, Check, RotateCw } from 'lucide-react';

const TodoCard = ({ context, setTodos, toast }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [inputText, setInputText] = useState(context.text);

    function deleteTodo(id) {
        const matches = JSON.parse(localStorage.getItem("todoList")).filter((todo) => todo.id === id);

        if (matches.length === 0) {
            toast({
                variant: "destructive",
                description: "This todo doesn't exist!"
            });
            return;
        }

        setTodos(prevState => prevState.filter((item) => item.id !== id));

        toast({description: "Todo is deleted!"});
    }

    function editTodo(id) {
        if (inputText === "") {
            toast({
                variant: "destructive",
                description: "Todo cannot be empty!"
            });
            return;
        }

        const currentTodos = JSON.parse(localStorage.getItem("todoList"));
        const matches = currentTodos.filter((todo) => todo.text === inputText);

        if (matches.length > 0) {
            toast({
                variant: "destructive",
                description: "This todo already exists!"
            });
            return;
        }

        const object = {
            id: id,
            text: inputText,
            date: context.date
        };

        const update = currentTodos.map((todo) => {
            if (todo.id === id) {
                return object;
            } else {
                return todo;
            }
        })

        setTodos(update);
        setIsEditing(false);

        toast({description: "Todo is updated!"});
    }

    return (
        <div id={context.id} className='todoCards' >
            {!isEditing ? (
                <>
                    <span className='todoContext' onClick={() => {setIsEditing(true); setInputText(context.text)}}>{context.text}</span>
                    <Button type="button" className='deleteBtn' onClick={() => deleteTodo(context.id)} variant="ghost" size="icon">
                        <MinusSquare />
                    </Button>
                </>
            ) : (
                <>
                    <Input type="text" placeholder={context.text} value={inputText} onChange={(e) => setInputText(e.target.value)}/>
                    <Button type="button" onClick={() => editTodo(context.id)} size="icon">
                        <Check />
                    </Button>
                    <Button type="button" onClick={() => setIsEditing(false)} variant="outline" size="icon">
                        <RotateCw />
                    </Button>
                </>
            )}
        </div>
    )
}

TodoCard.propTypes = {
    context: PropTypes.object.isRequired,
    setTodos: PropTypes.func.isRequired,
    toast: PropTypes.func.isRequired
};

export default TodoCard;
