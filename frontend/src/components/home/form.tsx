import { startTransition, useState } from "react";
import type { ToDoType } from "./types";

const minLength = 5;

export default function TodoForm({
	onAdd,
	addOptimisticTodos,
}: {
	onAdd: (text: string) => Promise<void>;
	addOptimisticTodos: (todos: ToDoType) => void;
}) {
	const [text, setText] = useState("");

	const handleSubmit = () => {
		const value = text.trim();
		if (!value) return;

		addOptimisticTodos({
			text: value,
			completed: false,
			sending: true,
			action: "Agregando",
		} as ToDoType);

		startTransition(async () => {
			await onAdd(value);
		});

		setText("");
	};

	return (
		<form
			action={handleSubmit}
			className="todo-form">
			<input
				type="text"
				placeholder="Nueva tarea..."
				value={text}
				minLength={minLength}
				onChange={e => setText(e.target.value)}
			/>
			<button type="submit">Agregar</button>
		</form>
	);
}
