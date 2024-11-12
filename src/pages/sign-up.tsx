import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpFormSchema, type SignUpFormValues } from '@/schemas/auth.schema';
import { useSearchParams } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { Header } from '@/components/layouts/header';
import { Form } from '@/components/ui/form';
import { SignUpOne } from '@/components/forms/sign-up-one';
import { SignUpTwo } from '@/components/forms/sign-up-two';
import { SignUpThree } from '@/components/forms/sign-up-three';

export function SignUpPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const step = searchParams.get('step');

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      termsAgree: {
        ageOver14Agree: false,
        serviceUseAgree: false,
        personalInfoAgree: false,
        marketingAgree: false,
      },
      userId: '',
      name: '',
      password: '',
      passwordConfirm: '',
      email: '',
      phone: '',
      userType: undefined,
      verificationCode: '',
    },
  });

  const onSubmit = (data: SignUpFormValues) => {
    console.log('Form submitted:', data);
  };

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-1 flex-col overflow-x-hidden overflow-y-scroll'
        >
          <div className='flex w-full flex-1 flex-col'>
            <div className='px-4 py-4 text-base font-medium text-suppin-main'>
              {step}/3
            </div>
            <div className='flex-1 overflow-y-auto px-4'>
              <SignUpOne form={form} stepHandler={stepTwoHandler} step={step} />
              <SignUpTwo
                form={form}
                stepHandler={stepThreeHandler}
                step={step}
              />
              <SignUpThree form={form} step={step} />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
