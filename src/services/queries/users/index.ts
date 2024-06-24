import { useQuery } from 'react-query';
import api from '../../api';
import queryKey from './keys';
import { UsersResponse, UsersType } from './types';
import config from '../../../config';
import mock from './mock.json';
import { saveLocalStorage } from '../../helper';

const BASE_URL = '/users';

export interface Query {
	status?: string;
	organization?: string;
	username?: string;
	date?: string;
	email?: string;
	phone_number?: string;
	pageNumber?: string | number;
	totalPages?: string | number;
	pageSize?: string | number;
}

const readFn = async (query: Query) => {
	const searchParams = new URLSearchParams(
		query as Record<string, string>
	).toString();

	const url = `${BASE_URL}${searchParams ? `?${searchParams}` : ''}`;

	let data = mock;

	if (query.status) {
		data = data.filter(
			(item) => String(item.status) === String(query.status || '')
		);
	}

	if (query.organization) {
		data = data.filter((item) =>
			JSON.stringify(item).includes(query.organization || '')
		);
	}

	if (query.username) {
		data = data.filter((item) =>
			JSON.stringify(item).includes(query.username || '')
		);
	}

	if (query.email) {
		data = data.filter((item) =>
			JSON.stringify(item).includes(query.email || '')
		);
	}

	if (query.date) {
		data = data.filter((item) =>
			JSON.stringify(item).includes(query.date || '')
		);
	}
	if (query.phone_number) {
		data = data.filter((item) =>
			JSON.stringify(item).includes(query.phone_number || '')
		);
	}
	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve('Success!');
		}, 1000);
	});

	try {
		await promise;
		await api.get({ url });
		return { data };
	} catch (error) {
		return { data };
	}
};

const readOneFn = async (id: string) => {
	const url = `${BASE_URL}`;

	const data = mock.find((item) => String(item.id) === id);

	const promise = new Promise((resolve) => {
		setTimeout(() => {
			resolve('Success!');
		}, 1000);
	});

	saveLocalStorage(data, 'userDetail');

	try {
		await promise;
		await api.get({ url });
		return { data };
	} catch (error) {
		return { data };
	}
};

const useRead = (options = { query: config.queryArgs as Query }) => {
	const query = options.query;

	const hash = [queryKey.read, JSON.stringify(query)];

	// console.log('coming from hash', hash);

	const response = useQuery(hash, () => readFn(query), {
		...options,
		onSuccess: () => {},
		onError: () => {},
	});

	return {
		...response,
		data: (response.data?.data || []) as UsersResponse['data'],
	};
};

const useReadOne = (id: string) => {
	const hash = [queryKey.readOne, JSON.stringify(id)];

	const response = useQuery(hash, () => readOneFn(id), {
		onSuccess: () => {},
		onError: () => {},
	});

	return {
		...response,
		data: response.data?.data as UsersType | undefined,
	};
};

const queries = { read: useRead, readOne: useReadOne, readFn };

export default queries;
