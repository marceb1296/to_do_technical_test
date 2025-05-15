import { verifyToken } from "@/actions";
import { logout } from "@/helpers";
import type { Token } from "@/types";
import { useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";

export const useAutoRenewToken = (
	user: Token,
	setUserHandler: (user: Partial<Token>) => void,
	navigate?: ((path: string) => void) | null
) => {
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	const renewToken = useCallback(async (refresh_token: string) => {
		if (refresh_token) {
			const { detail, ...rest } = await verifyToken(refresh_token);

			if (detail) {
				toast.error(detail);
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
				logout(user.token, navigate);
				return;
			}

			setUserHandler(rest.result);
		} else {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		}
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (user && user.refresh_token) {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);

			const now = new Date();
			const timeUntilExpiry =
				new Date(user.expiry_date).getTime() - now.getTime() - 5000;

			if (timeUntilExpiry > 0) {
				timeoutRef.current = setTimeout(() => {
					renewToken(user.refresh_token);
				}, timeUntilExpiry);
			} else {
				renewToken(user.refresh_token);
			}

			return () => {
				if (timeoutRef.current) {
					clearTimeout(timeoutRef.current);
				}
			};
		}
		// eslint-disable-next-line
	}, [user.refresh_token]);
};
