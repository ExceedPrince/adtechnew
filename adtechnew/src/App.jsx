import { useState, useEffect } from "react";
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
import { useToast } from "./components/ui/use-toast";
import { Toaster } from "./components/ui/toaster";
import { PlusSquare } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import TodoCard from "./components/own/TodoCard";
import Pagination from "./components/own/Pagination";
import './App.css'

const formSchema = z.object({
    todo: z.string().min(2).max(50),
});

const App = () => {
    
    const [todos, setTodos] = useState(localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []);
    const [pagination, setPagination] = useState(0);
    const [page, setPage] = useState(1);
    const [canSubmit, setCanSubmit] = useState(false);
    const [editingNumber, setEditingNumber] = useState(0);

    const { toast } = useToast();

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
            toast({
                variant: "destructive",
                description: "Empty todo cannot be submitted!"
            });
            return;
        }

        const matches = todos.filter((todo) => todo.text.toLowerCase().trim() === e.target[0].value.toLowerCase().trim());

        if (matches.length > 0) {
            toast({
                variant: "destructive",
                description: "This todo already exists!"
            });
            return;
        }

        const object = {
            id: `todo_${uuidv4()}`,
            text: e.target[0].value,
            date: new Date().getTime()
        };

        setTodos((prevState) => [...prevState, object]);
        toast({description: "New todo has been added to the list!"});
        form.reset();
    }

    return (
        <>
            <h1 className="font-bold text-2xl py-8">To-Do List</h1>
            <Form {...form}>
                <form onSubmit={(e) => form.handleSubmit(onSubmit(e))} onChange={(e) => e.target.value.length > 1 ? setCanSubmit(true) : setCanSubmit(false)} className="space-y-8 flex flex-row justify-between w-full">
                    <FormField control={form.control} name="todo" render={({ field }) => (
                        <FormItem className="w-11/12">
                            <FormLabel>To-Do*</FormLabel>
                            <FormControl>
                                <Input placeholder="To-Do" type="text" {...field} />
                            </FormControl>
                            <FormDescription>Enter the to-do</FormDescription>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                    <Button type="submit" className={`transition-all ${!canSubmit && "opacity-20 pointer-events-none"}`} variant="ghost" size="icon">
                        <PlusSquare />
                    </Button>
                </form>
            </Form>
            <div id="todoList" className="mt-8">
                {todos && todos.sort((a, b) => b.date - a.date).slice((page - 1) * 10, page * 10).map((item, index) => (
                    <TodoCard key={`todoCard_${index}`} context={item} setTodos={setTodos} toast={toast} setEditingNumber={setEditingNumber} />
                ))}
            </div>
            {pagination > 1 && <Pagination pagination={pagination} page={page} setPage={setPage} editingNumber={editingNumber} />}
            <Toaster />
        </>
    );
};

export default App;
