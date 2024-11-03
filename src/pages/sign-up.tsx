import { SignUpOne } from '@/components/forms/sign-up-one';
import { SignUpTwo } from '@/components/forms/sign-up-two';
import { Header } from '@/components/layouts/header';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export function SignUpPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const step = searchParams.get('step');

  const stepTwoHandler = useCallback(() => setSearchParams({ step: '2' }), []);
  const stepThreeHandler = useCallback(
    () => setSearchParams({ step: '3' }),
    [],
  );

  useEffect(() => {
    if (!step) {
      setSearchParams({ step: '1' }, { replace: true });
    }
  }, []);

  return (
    <div className='flex h-full w-full flex-col'>
      <Header
        label='회원가입'
        href={
          step && step !== '1'
            ? `/sign-up?step=${parseInt(step) - 1}`
            : undefined
        }
      />
      <div className='relative flex h-full w-full flex-col'>
        <div className='flex w-full flex-col'>
          <div className='my-4 text-base font-medium text-suppin-main'>
            {step}/3
          </div>
          <SignUpOne stepHandler={stepTwoHandler} step={step} />
          <SignUpTwo stepHandler={stepThreeHandler} step={step} />
        </div>
      </div>
    </div>
  );
}
