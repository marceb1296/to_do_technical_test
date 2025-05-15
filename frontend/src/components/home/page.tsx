import { startTransition, useEffect, useOptimistic, useState } from "react";
import TodoForm from "./form";
import type { ToDoType } from "./types";
import {
	addTodoAction,
	deleteTodoAction,
	getUserTasks,
	updateTodoActionCompleted,
	updateTodoActionText,
} from "./actions";
import { getUserStore } from "@/store/user";
import toast from "react-hot-toast";
import TodoItem from "./item";
import "./style.scss";

/**
 * Add Skeleton UI
 */

export const HomePage = () => {
	const $user = getUserStore();
	const [todos, setTodos] = useState<ToDoType[]>([]);

	const [optimisticTodos, addOptimisticTodos] = useOptimistic(
		todos,
		(state, newTodo: ToDoType) =>
			newTodo.action === "Agregando"
				? [...state, newTodo]
				: ["Actualizando", "Eliminando"].includes(newTodo.action!)
				? [
						...state.map(todo =>
							todo.id === newTodo.id
								? { ...todo, ...newTodo }
								: todo
						),
				  ]
				: [...state]
	);

	const addTodo = async (text: string) => {
		const result = await addTodoAction(text, $user.token);

		if (result.detail) {
			toast.error(result.detail);
			return;
		}

		startTransition(async () => {
			setTodos(prev => [...prev, result.result]);
		});
	};

	const toggleComplete = async (id: number, completed: boolean) => {
		const result = await updateTodoActionCompleted(
			id,
			completed,
			$user.token
		);

		if (result.detail) {
			toast.error(result.detail);
			return;
		}

		startTransition(async () => {
			setTodos(prev =>
				prev.map(todo =>
					todo.id == id ? { ...todo, ...result.result } : todo
				)
			);
		});
	};

	const deleteTodo = async (id: number) => {
		const result = await deleteTodoAction(id, $user.token);

		if (result.detail) {
			toast.error(result.detail);
			return;
		}

		startTransition(async () => {
			setTodos(prev => prev.filter(todo => todo.id !== id));
		});
	};

	const updateTodo = async (id: number, newText: string) => {
		const result = await updateTodoActionText(id, newText, $user.token);

		if (result.detail) {
			toast.error(result.detail);
			return;
		}

		startTransition(async () => {
			setTodos(prev =>
				prev.map(todo =>
					todo.id === id ? { ...todo, ...result.result } : todo
				)
			);
		});
	};

	useEffect(() => {
		const makeTodos = async () => {
			getUserTasks($user.token).then(({ detail, result }) => {
				if (detail) {
					toast.error(detail);
					return;
				}

				startTransition(() => {
					setTodos(result);
				});
			});
		};
		makeTodos();
		// eslint-disable-next-line
	}, []);

	return (
		<section className="flex gap column">
			<h1>Todo List</h1>
			<TodoForm
				onAdd={addTodo}
				addOptimisticTodos={addOptimisticTodos}
			/>

			<ul className="todo-list">
				<TodoItem
					todo={optimisticTodos}
					addOptimisticTodos={addOptimisticTodos}
					onToggle={toggleComplete}
					onDelete={deleteTodo}
					onUpdate={updateTodo}
				/>
			</ul>
		</section>
	);
};
