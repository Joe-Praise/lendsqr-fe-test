# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Praise Joseph Alimi

This is a test project for the position of a frontend developer at Lendsqr.

Stack and tools used: React Vite, Typescript, Scss, React Query, axios, Formik, React-countup, React-toastify, yup, vitest, jsdom, and jest.

I thought of the best way to carry out authentication, filtering and data storage and decided for:

- Authentication: Formik and yup were perfect for the signup form

- Table filtering: useSearchParams along with some custom hooks and URL SearchParams made filtering smooth like butter on ice. this made it possible to presist filters by saving it in the URL. with this a user can share a filter url and someone else can have access to that same filter result.

-Storage: i used session storage for user credentials and local storage for user details page

-styling: i made use of BEM methodology as it goes smoothly with scss

[portfolio website](https://josephpraise.vercel.app/)
