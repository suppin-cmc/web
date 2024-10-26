import { Outlet } from 'react-router-dom';

export function AuthLayout() {
  return (
    <div className='h-screen w-full overflow-hidden px-5'>
      <Outlet />
    </div>
  );
}
