import { SignInForm } from '@/components/forms/sign-in-form';
import { LogoIcon } from '@/components/ui/icons';

export function SignInPage() {
  return (
    <div className='relative flex h-full w-full flex-col items-center justify-center gap-10'>
      <LogoIcon />
      <SignInForm />
      <div className='text-suppin-gray3 absolute bottom-10 left-[50%] w-full translate-x-[-50%] text-center text-sm'>
        문의접수: suppin.official@gmail.com
      </div>
    </div>
  );
}
