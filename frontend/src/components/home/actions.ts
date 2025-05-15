import { FetchActionHandler } from "@/actions";
import { AUTHORIZATION_KEYWORD, SERVER_URL } from "@/const";

export const addTodoAction = (text: string, token: string) =>
	FetchActionHandler({
		url: `${SERVER_URL}/task/add`,
		init: {
			method: "POST",
			body: JSON.stringify({ text }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${token}`,
			},
		},
	});

export const updateTodoActionText = (id: number, text: string, token: string) =>
	FetchActionHandler({
		url: `${SERVER_URL}/task/update/${id}`,
		init: {
			method: "PATCH",
			body: JSON.stringify({ text }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${token}`,
			},
		},
	});

export const updateTodoActionCompleted = (
	id: number,
	completed: boolean,
	token: string
) =>
	FetchActionHandler({
		url: `${SERVER_URL}/task/update/${id}`,
		init: {
			method: "PATCH",
			body: JSON.stringify({ completed }),
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${token}`,
			},
		},
	});

export const getUserTasks = (token: string) =>
	FetchActionHandler({
		url: `${SERVER_URL}/task`,
		init: {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${token}`,
			},
		},
	});

export const deleteTodoAction = (id: number, token: string) =>
	FetchActionHandler({
		url: `${SERVER_URL}/task/delete/${id}`,
		init: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${token}`,
			},
		},
		isDelete: true,
	});
