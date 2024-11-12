import { Id, toast } from 'react-toastify';
import config from '../config';
import { UsersType } from './queries/users/types';

export const errorToast = (message = 'Something went wrong', toastId?: Id) => {
  toast.error(message, {
    toastId,
  });
};

export const successToast = (message = 'Successful', toastId?: Id) => {
  toast.success(message, { toastId });
};

export const saveLocalStorage = (data: any, key: string) => {
  try {
    const jsonData = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    return false;
  }
};

export const getLocalStorage = (key: string) => {
  try {
    const jsonData = localStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
};
export const saveSessionStorage = (data: any, key: string) => {
  try {
    const jsonData = JSON.stringify(data);
    sessionStorage.setItem(key, jsonData);
    return true;
  } catch (error) {
    return false;
  }
};

export const getSessionStorage = (key: string) => {
  try {
    const jsonData = sessionStorage.getItem(key);
    if (!jsonData) return null;
    return JSON.parse(jsonData);
  } catch (error) {
    return null;
  }
};

export const checkToken = () => {
  const token = getSessionStorage(config.tokenKey);

  return !!token;
};

export const getQueryKeys = (namespace: string) => ({
  create: `${namespace}/create`,
  read: `${namespace}/read`,
  readOne: `${namespace}/readOne`,
  update: `${namespace}/update`,
  patch: `${namespace}/patch`,
  put: `${namespace}/put`,
  delete: `${namespace}/delete`,
});

export function handleErrors(err: any) {
  const { response, message } = err;
  const { data } = response;

  if (!data) return message;

  const errorMessage: string = data?.message || 'Something went wrong';

  return errorMessage;
}

export const getUniqueOrganizations = (data: UsersType[]): string[] => {
  const organizationSet = new Set<string>();
  data.forEach((item) => organizationSet.add(item.organization));
  return Array.from(organizationSet);
};

export const cleanObject = (
  obj: Record<string, string | number | null>
): Record<string, string> => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      acc[key] = value.toString();
    }
    return acc;
  }, {} as Record<string, string>);
};
