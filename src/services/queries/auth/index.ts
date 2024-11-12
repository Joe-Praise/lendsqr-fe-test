import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import config from '../../../config';
import api from '../../api';
import {
  errorToast,
  handleErrors,
  saveLocalStorage,
  saveSessionStorage,
  successToast,
} from '../../helper';
import queryKey from './keys';
import { routes } from '../../../navigation';

const BASE_URL = '/auth';

const useCreate = (options = {}) => {
  const { mutate, isLoading, data, isSuccess, status } = useMutation(
    async (args: Request) => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Success!');
        }, 1500);
      });

      await promise;

      return api.post(args);
    },
    {
      mutationKey: [queryKey.create],
      ...options,
      onSuccess: () => {
        successToast('Registration successful');
      },
      onError: () => {
        successToast('Registration successful');
      },
    }
  );

  return {
    mutate: (body: any) =>
      mutate({ url: `${BASE_URL}/register-invited-user`, body, auth: false }),
    isLoading,
    data,
    isSuccess,
    status,
  };
};

type Request = {
  url: string;
  body?: any;
  auth?: boolean;
};

const useLogin = (options = {}) => {
  const navigate = useNavigate();

  const handleLogin = () => {
    successToast('Sign in successful');
    setTimeout(() => navigate(routes.dashboard.users.path), 1000);
  };

  const { isLoading, data, isSuccess } = useMutation(
    async (args: Request) => {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Success!');
        }, 1500);
      });

      await promise;

      // ReactSession.set('email', args.body?.email);

      saveSessionStorage(args.body?.email, 'email');

      return api.post(args);
    },
    {
      mutationKey: [queryKey.login],
      ...options,
      onSuccess: (response: any) => {
        if (response.succeeded) {
          saveLocalStorage(response.data, config.tokenKey);

          successToast('Sign in successful');
          console.log('response', response);
          handleLogin();
        }
      },
      onError: (err: any) => {
        false && errorToast(handleErrors(err));
      },
    }
  );
  return {
    mutate: (body: any) => {
      console.log('body', body);
      if (body.email.length === 0 || body.password.length === 0) {
        errorToast('Please enter your email and password');
      } else {
        handleLogin();
      }
      //   mutate({ url: `${BASE_URL}/login`, body, auth: false }),
    },
    isLoading,
    data,
    isSuccess,
  };
};

const useLogout = (options = {}) => {
  const response = useQuery(
    [queryKey.logout],
    () => api.get({ url: `${BASE_URL}/logout` }),
    {
      ...options,
      onSuccess: () => {},
      onError: () => {},
    }
  );

  return response;
};

const queries = { create: useCreate, login: useLogin, logout: useLogout };

export default queries;
