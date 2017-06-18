export interface iUser {
	id: string;
	name: string;
	email: string;
	language: string;
	picture: string;
	categories: Array<{name: string, quantity: number}>;
}