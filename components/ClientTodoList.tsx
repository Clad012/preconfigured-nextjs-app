"use client";

import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Trash } from "lucide-react";

export function ClientTodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, input]);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTodo();
    }
  };

  const deleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Client Todo List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Add a todo"
              className="flex-1"
              aria-label="Add a todo"
            />
            <Button onClick={addTodo}>Add</Button>
          </div>
          <ul className="space-y-2">
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <span>{todo}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTodo(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-muted-foreground">
          This todo list is client-side rendered. Your todos will disappear on
          page refresh.
        </p>
      </CardFooter>
    </Card>
  );
}
