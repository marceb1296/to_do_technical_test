import { logoutAction } from "./actions";
import { COOKIE_NAME } from "./const";
import { cookies } from "./cookies";
import { setUserStore } from "./store/user";
import type { Token } from "./types";

export const logout = async (
	token: string,
	navigate?: ((path: string) => void) | null
) => {
	/**
	 * Add a short delay to ensure cookies are properly deleted
	 * before any navigation or reload occurs.
	 */

	setUserStore({} as Token, true);
	logoutAction(token);
	await new Promise(resolve => setTimeout(resolve, 400));
	cookies.delete(COOKIE_NAME);

	if (navigate) {
		navigate("/login");
	} else {
		window.location.reload();
	}
};
