import { AUTHORIZATION_KEYWORD, COOKIE_NAME, SERVER_URL } from "@/const";
import { cookies } from "@/cookies";

export const FetchActionHandler = ({
	url,
	init,
	simpleResponse = false,
	isDelete = false,
	isAuth = false,
	isCreate = false,
}: {
	url: string;
	init: RequestInit;
	simpleResponse?: boolean;
	isDelete?: boolean;
	isAuth?: boolean;
	isCreate?: boolean;
}) =>
	fetch(url, { ...init })
		.then(async r => {
			if (isDelete) {
				if (r.status === 204) return {};
			} else if (isCreate) {
				if (r.status === 201) return {};
			} else {
				if (!r.ok) throw new Error(JSON.stringify(await r.json()));
			}
			return r.json();
		})
		.then(r => {
			if (r.detail) {
				throw new Error(JSON.stringify(r));
			}

			if (isAuth) {
				cookies.set(COOKIE_NAME, JSON.stringify(r), r.expiry_date);
			}

			return simpleResponse
				? r
				: {
						result: r,
						success: true,
				  };
		})
		.catch(err => {
			try {
				const detail = JSON.parse(err.message);
				return {
					detail: detail.detail,
				};
			} catch {
				return {
					detail: "Server Error",
				};
			}
		});

export const verifyToken = async (refreshToken: string) =>
	FetchActionHandler({
		url: `${SERVER_URL}/auth/login/update`,
		init: {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${refreshToken}`,
			},
		},
	});

export const logoutAction = (token: string) =>
	FetchActionHandler({
		url: `${SERVER_URL}/auth/logout`,
		init: {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `${AUTHORIZATION_KEYWORD} ${token}`,
			},
		},
	});
