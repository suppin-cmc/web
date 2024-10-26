import { HomePage } from '@/pages/home';
import { AuthLayout } from '@/pages/layouts/auth.layout';
import { RootLayout } from '@/pages/layouts/root.layout';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/sign-in',
        lazy: async () => {
          const { SignInPage } = await import('@/pages/sign-in');
          return { Component: SignInPage };
        },
      },
      {
        path: '/sign-up',
        lazy: async () => {
          const { SignUpPage } = await import('@/pages/sign-up');
          return { Component: SignUpPage };
        },
      },
    ],
  },
]);
