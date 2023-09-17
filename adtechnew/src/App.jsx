import React, { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./components/ui/form";
import { Input } from "./components/ui/input";
import { PlusSquare } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./components/own/TodoCard";
import Pagination from "./components/own/Pagination";

const formSchema = z.object({
    todo: z.string().min(2).max(50),
});

const App = () => {
    const [todos, setTodos] = useState(localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []);
    const [pagination, setPagination] = useState(0);
    const [page, setPage] = useState(1);

    useEffect(() => {
        localStorage.setItem("todoList", JSON.stringify(todos));

        setPagination(Math.ceil(todos.length / 10));
    }, [todos]);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            todo: "",
        },
    });

    function onSubmit(e) {
        e.preventDefault();

        if (e.target[0].value === "") {
            console.log("empty!!!");
            return;
        }

        const matches = todos.filter((todo) => todo.text === e.target[0].value);

        if (matches.length > 0) {
            console.log("match!!!");
            return;
        }

        const object = {
            id: `todo_${uuidv4()}`,
            text: e.target[0].value,
        };

        setTodos((prevState) => [...prevState, object]);
    }

    return (
        <>
            <h1>To-Do List</h1>
            <Form {...form}>
                <form onSubmit={(e) => form.handleSubmit(onSubmit(e))} className="space-y-8">
                    <FormField control={form.control} name="todo" render={({ field }) => (
                        <FormItem>
                            <FormLabel>To-Do*</FormLabel>
                            <FormControl>
                                <Input placeholder="To-Do" type="text" {...field} />
                            </FormControl>
                            <FormDescription>Enter the to-do</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" variant="ghost" size="icon">
                        <PlusSquare />
                    </Button>
                </form>
            </Form>
            <div id="todoList">
                {todos && todos.slice((page - 1) * 10, page * 10 + 1).map((item, index) => (
                    <TodoCard key={`todoCard_${index}`} context={item} setTodos={setTodos} />
                ))}
            </div>
            <Pagination pagination={pagination} page={page} setPage={setPage} />
        </>
    );
};

export default App;