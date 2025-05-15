import { getIsLoggedInStore } from "@/store/user";
import { Redirect } from "wouter";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	const $isLoggedIn = getIsLoggedInStore();

	if (!$isLoggedIn) {
		return <Redirect to="/login" />;
	}

	return <>{children}</>;
};
