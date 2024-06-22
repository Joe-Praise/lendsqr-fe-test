// import stub from './stub.json';
import mock from './mock.json';

export type UsersType = ReturnType<() => (typeof mock)[0]>;

export interface UsersResponse {
	data: UsersType[];
}
