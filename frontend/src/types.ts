type User = {
	username: string;
};

export type Token = {
	token: string;
	expiry: number;
	expiry_date: string;
	refresh_token: string;
	user: User;
};


export type ActionFnResult<T> = Promise<{
	result: T;
	detail?: string;
}>;
