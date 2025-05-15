import { COOKIE_NAME } from "@/const";
import { cookies } from "@/cookies";
import type { Token } from "@/types";
import { useStore } from "@nanostores/react";
import { atom, computed, onMount } from "nanostores";

export const userStore = atom<Token>({} as Token);

export const setUserStore = (user: Partial<Token>, deleteInstance = false) => {
	if (deleteInstance) {
		userStore.set(user as Token);
	} else {
		const newUser = {
			...userStore.get(),
			...user,
		};

		userStore.set(newUser);
		cookies.set(COOKIE_NAME, JSON.stringify(newUser), newUser.expiry_date);
	}
};

// eslint-disable-next-line
export const getUserStore = () => useStore(userStore);

const isLoggedIn = computed(userStore, user =>
	Object.prototype.hasOwnProperty.call(user, "token")
);
// eslint-disable-next-line
export const getIsLoggedInStore = () => useStore(isLoggedIn);

onMount(userStore, () => {
	const _user = JSON.parse(cookies.get(COOKIE_NAME) ?? "{}") as Token;

	if (Object.prototype.hasOwnProperty.call(_user, "token")) {
		userStore.set(_user);
	}
});
