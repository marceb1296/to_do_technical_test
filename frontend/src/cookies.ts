
export const cookies = {
	set: (name: string, value: string, expiry?: string): void => {
		let expires = "";
		if (expiry) {
			expires = "; expires=" + expiry;
		}
		if (typeof window !== "undefined") {
			document.cookie = `${name}=${value || ""}${expires}; path=/`;
		}
	},

	has: (name: string): boolean => {
		if (typeof window !== "undefined") {
			const nameEQ = `${name}=`;
			const cookies = document.cookie.split(";");
			for (let i = 0; i < cookies.length; i++) {
				let cookie = cookies[i];
				while (cookie.charAt(0) === " ")
					cookie = cookie.substring(1, cookie.length);
				if (cookie.indexOf(nameEQ) === 0) return true;
			}
		}
		return false;
	},

	get: (name: string): string | null => {
		if (typeof window !== "undefined") {
			const nameEQ = `${name}=`;
			const _cookies = document.cookie.split(";");
			for (let i = 0; i < _cookies.length; i++) {
				let cookie = _cookies[i];
				while (cookie.charAt(0) === " ")
					cookie = cookie.substring(1, cookie.length);
				if (cookie.indexOf(nameEQ) === 0)
					return decodeURIComponent(
						cookie.substring(nameEQ.length, cookie.length)
					);
			}
		}
		return null;
	},

	delete: (name: string): void => {
		document.cookie = `${name}=; Max-Age=-99999999;`;
	},
};
