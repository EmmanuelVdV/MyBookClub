export interface iUser {
	id: string;
	displayName: string;
	email: string;
	language: string;
	photoURL: string;
	categories: Array<{id: string, name: string, quantity: number}>;
}