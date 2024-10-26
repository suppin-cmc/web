import { Outlet } from 'react-router-dom';

export function RootLayout() {
  return (
    <div className='h-screen w-full overflow-hidden'>
      <Outlet />
    </div>
  );
}
