import { BackIcon } from '@/components/ui/icons';
import { Link } from 'react-router-dom';

type HeaderProps = {
  label: string;
  href?: string;
};

export function Header({ label, href }: HeaderProps) {
  return (
    <div className='flex h-12 w-full items-center justify-center'>
      <Link
        to={href || '..'}
        className='absolute left-0 top-0 flex h-11 w-11 cursor-pointer items-center justify-center'
      >
        <BackIcon />
      </Link>
      <span className='text-lg text-suppin-gray1'>{label}</span>
    </div>
  );
}
