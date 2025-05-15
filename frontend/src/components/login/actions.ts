import { FetchActionHandler } from "@/actions";
import { SERVER_URL } from "@/const";
import type { ActionFnResult, Token } from "@/types";

export const makeAuth = async (formData: string): ActionFnResult<Token> =>
	FetchActionHandler({
		url: `${SERVER_URL}/auth/login`,
		init: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Basic ${formData}`,
			},
		},
	});

export const makeRegister = async (
	formData: Record<string, string>
): ActionFnResult<Token> =>
	FetchActionHandler({
		url: `${SERVER_URL}/auth/register`,
		init: {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		},
		isCreate: true,
	});
