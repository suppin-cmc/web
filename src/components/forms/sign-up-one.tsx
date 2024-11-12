import { cn } from '@/lib/utils';
import { SignUpFormValues } from '@/schemas/auth.schema';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { CheckIcon } from '../ui/icons';

export const SignUpOne = ({
  form,
  step,
  stepHandler,
}: {
  form: UseFormReturn<SignUpFormValues>;
  step: string | null;
  stepHandler: () => void;
}) => {
  const { watch, setValue } = form;
  const termsAgree = watch('termsAgree');

  const handleCheckboxClick = useCallback(
    (field: keyof SignUpFormValues['termsAgree']) => {
      setValue(`termsAgree.${field}` as const, !termsAgree[field]);
    },
    [termsAgree, setValue],
  );

  const handleAllCheck = useCallback(() => {
    const allChecked = Object.values(termsAgree).every((value) => value);
    const newValue = !allChecked;

    (
      Object.keys(termsAgree) as Array<keyof SignUpFormValues['termsAgree']>
    ).forEach((key) => {
      setValue(`termsAgree.${key}` as const, newValue);
    });
  }, [termsAgree, setValue]);

  const isEnabled =
    termsAgree.ageOver14Agree &&
    termsAgree.serviceUseAgree &&
    termsAgree.personalInfoAgree;

  const terms = [
    {
      key: 'ageOver14Agree' as const,
      label: '(필수) 만 14세 이상입니다.',
    },
    {
      key: 'serviceUseAgree' as const,
      label: '(필수) 서비스 이용약관 동의',
    },
    {
      key: 'personalInfoAgree' as const,
      label: '(필수) 개인정보 처리방침 동의',
    },
    {
      key: 'marketingAgree' as const,
      label: '(선택) 마케팅 수신 동의',
    },
  ];

  return (
    <div
      className={cn('flex flex-col gap-8', step === '1' ? 'block' : 'hidden')}
    >
      <div className='mb-24 flex flex-col gap-1.5'>
        <h1 className='text-2xl font-semibold text-suppin-gray1'>
          약관에 동의해주세요
        </h1>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between'>
            <div className='flex min-h-10 w-full gap-2.5 p-2.5'>
              <CheckIcon
                onClick={handleAllCheck}
                isChecked={Object.values(termsAgree).every((value) => value)}
                className='cursor-pointer'
              />
              <div className='flex w-full flex-col gap-2.5'>
                <span className='font-semibold text-[#3F3F3F]'>모두 동의</span>
                <span className='text-xs font-medium text-[#787878]'>
                  서비스 이용을 위해 아래의 약관을 모두 동의합니다.
                </span>
                <Separator className='h-[1px] w-full bg-suppin-gray4' />
              </div>
            </div>
          </div>
        </div>
        {terms.map(({ key, label }) => (
          <div key={key} className='flex items-center justify-between'>
            <div className='flex min-h-10 w-full items-center gap-2.5 p-2.5'>
              <CheckIcon
                onClick={() => handleCheckboxClick(key)}
                isChecked={termsAgree[key]}
              />
              <span className='font-semibold text-[#3F3F3F]'>{label}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='fixed bottom-0 left-0 right-0 bg-white px-4 py-4'>
        <Button
          variant='ghost'
          disabled={!isEnabled}
          onClick={stepHandler}
          className='flex h-[50px] w-full items-center justify-center rounded-md bg-suppin-main font-semibold text-white disabled:bg-suppin-gray3'
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
