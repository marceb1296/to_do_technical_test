import { startTransition, useState } from "react";
import type { ToDoType } from "./types";

export default function TodoItem({
	todo,
	onToggle,
	onDelete,
	onUpdate,
	addOptimisticTodos,
}: {
	todo: ToDoType[];
	onToggle: (id: number, completed: boolean) => Promise<void>;
	onDelete: (id: number) => Promise<void>;
	onUpdate: (id: number, text: string) => Promise<void>;
	addOptimisticTodos: (todos: ToDoType) => void;
}) {
	return (
		<>
			{todo.map((el, index) => (
				<Item
					key={index}
					todo={el}
					onToggle={onToggle}
					onDelete={onDelete}
					onUpdate={onUpdate}
					addOptimisticTodos={addOptimisticTodos}
				/>
			))}
		</>
	);
}

const Item = ({
	todo,
	onToggle,
	onDelete,
	onUpdate,
	addOptimisticTodos,
}: {
	todo: ToDoType;
	onToggle: (id: number, completed: boolean) => Promise<void>;
	onDelete: (id: number) => Promise<void>;
	onUpdate: (id: number, text: string) => Promise<void>;
	addOptimisticTodos: (todos: ToDoType) => void;
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newText, setNewText] = useState(todo.text);

	const handleUpdate = () => {
		if (newText.trim() && todo.id) {
			addOptimisticTodos({
				text: newText,
				id: todo.id,
				sending: true,
				action: "Actualizando",
			} as ToDoType);

			startTransition(async () => {
				await onUpdate(todo.id!, newText);
			});

			setIsEditing(false);
		}
	};

	const handleComplete = () => {
		if (newText.trim() && todo.id) {
			startTransition(async () => {
				addOptimisticTodos({
					id: todo.id,
					sending: true,
					action: "Actualizando",
				} as ToDoType);
				await onToggle(todo.id, !todo.completed);
			});
		}
	};

	const handleDelete = () => {
		if (newText.trim() && todo.id) {
			startTransition(async () => {
				addOptimisticTodos({
					id: todo.id,
					sending: true,
					action: "Eliminando",
				} as ToDoType);
				await onDelete(todo.id);
			});
		}
	};

	return (
		<li className={`todo-item ${todo.completed ? "completed" : ""}`}>
			<span>
				{isEditing ? (
					<form action={handleUpdate}>
						<input
							type="text"
							value={newText}
							minLength={5}
							onChange={e => setNewText(e.target.value)}
						/>
						<button>Save</button>
					</form>
				) : (
					<>
						<span onClick={handleComplete}>{todo.text}</span>
						<button onClick={() => setIsEditing(true)}>Edit</button>
					</>
				)}
				<button onClick={handleDelete}>Delete</button>
			</span>
			{!!todo.sending && <small>{todo.action}...</small>}
		</li>
	);
};
