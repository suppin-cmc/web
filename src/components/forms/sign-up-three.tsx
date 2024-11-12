import { cn } from '@/lib/utils';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { SignUpFormValues } from '@/schemas/auth.schema';
import { UseFormReturn } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '../ui/form';

const USER_TYPE = ['인플루언서', '마케팅 대행사', '브랜딩 담당자'];

export const SignUpThree = ({
  form,
  step,
}: {
  form: UseFormReturn<SignUpFormValues>;
  step: string | null;
}) => {
  const { setValue, watch } = form;
  const selectedUserType = watch('userType');

  return (
    <div
      className={cn('flex flex-col gap-8', step === '3' ? 'block' : 'hidden')}
    >
      <div className='mb-24 flex flex-col gap-8'>
        <h1 className='text-2xl font-semibold text-suppin-gray1'>
          Suppin 이용을 위한 계정
          <br />
          정보를 생성해주세요
        </h1>
        <div className='flex flex-col gap-7'>
          <FormField
            control={form.control}
            name='userId'
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-suppin-gray2'>
                      ID
                    </span>
                    <span className='cursor-pointer text-sm font-medium text-suppin-main'>
                      중복확인
                    </span>
                  </div>
                  <div className='flex w-full flex-col rounded-lg border border-suppin-gray4'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='아이디를 입력해주세요'
                        type='text'
                        className='h-12 border-none bg-transparent px-5 py-2.5 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-3'>
                  <span className='text-sm font-medium text-suppin-gray2'>
                    비밀번호
                  </span>
                  <div className='flex w-full flex-col rounded-lg border border-suppin-gray4'>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='비밀번호를 입력해주세요'
                        className='h-12 border-none bg-transparent px-5 py-2.5 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='passwordConfirm'
            render={({ field }) => (
              <FormItem>
                <div className='flex flex-col gap-3'>
                  <span className='text-sm font-medium text-suppin-gray2'>
                    비밀번호 확인
                  </span>
                  <div className='flex w-full flex-col rounded-lg border border-suppin-gray4'>
                    <FormControl>
                      <Input
                        {...field}
                        type='password'
                        placeholder='비밀번호를 다시 입력해주세요'
                        className='h-12 border-none bg-transparent px-5 py-2.5 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='userType'
            render={() => (
              <FormItem>
                <div className='flex flex-col gap-3'>
                  <span className='text-sm font-medium text-suppin-gray2'>
                    유형
                  </span>
                  <div className='flex flex-wrap items-center gap-1.5'>
                    {USER_TYPE.map((type) => (
                      <Button
                        key={type}
                        type='button'
                        variant='link'
                        onClick={() =>
                          setValue(
                            'userType',
                            type as
                              | '인플루언서'
                              | '마케팅 대행사'
                              | '브랜딩 담당자',
                          )
                        }
                        className={cn(
                          'rounded-lg border text-sm font-semibold hover:no-underline',
                          selectedUserType === type
                            ? 'border-suppin-main bg-suppin-main text-white'
                            : 'border-suppin-main text-suppin-main',
                        )}
                      >
                        {type}
                      </Button>
                    ))}
                  </div>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 bg-white px-4 py-4'>
        <Button
          type='submit'
          variant='ghost'
          className='flex h-[50px] w-full items-center justify-center rounded-md bg-suppin-main font-semibold text-white disabled:bg-suppin-gray3'
        >
          회원가입하기
        </Button>
      </div>
    </div>
  );
};
