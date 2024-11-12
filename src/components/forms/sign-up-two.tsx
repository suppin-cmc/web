import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Separator } from '../ui/separator';
import { SignUpFormValues } from '@/schemas/auth.schema';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormControl, FormMessage } from '../ui/form';

export const SignUpTwo = ({
  form,
  step,
  stepHandler,
}: {
  form: UseFormReturn<SignUpFormValues>;
  step: string | null;
  stepHandler: () => void;
}) => {
  return (
    <div
      className={cn('flex flex-col gap-8', step === '2' ? 'block' : 'hidden')}
    >
      <div className='mb-24 flex flex-col gap-8'>
        <h1 className='text-2xl font-semibold text-suppin-gray1'>
          회원 가입에 필요한 기본 정보를 입력해주세요
        </h1>
        <div className='flex flex-col gap-7'>
          <div className='flex flex-col gap-3'>
            <span className='text-sm text-suppin-gray2'>기본정보 입력</span>
            <div className='flex w-full flex-col rounded-lg border border-suppin-gray4'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='이름'
                        type='text'
                        className='h-12 border-none bg-transparent px-5 py-2.5 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Separator className='h-[1px] w-full bg-suppin-gray4' />
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='휴대폰 번호'
                        className='h-12 border-none bg-transparent px-5 py-2.5 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className='flex flex-col gap-3'>
            <span className='text-sm text-suppin-gray2'>이메일 인증</span>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <div className='flex w-full flex-col rounded-lg border border-suppin-gray4'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='이메일을 입력해주세요'
                        type='email'
                        className='h-12 border-none bg-transparent px-5 py-2.5 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              variant='ghost'
              className='h-12 w-full rounded-lg bg-suppin-sub2 text-sm font-semibold text-suppin-main'
            >
              이메일 인증하기
            </Button>
          </div>

          <div className='flex w-full items-center gap-1.5'>
            <FormField
              control={form.control}
              name='verificationCode'
              render={({ field }) => (
                <FormItem className='flex-1'>
                  <div className='flex h-12 w-full items-center justify-between gap-2 rounded-lg border border-suppin-gray4 px-5 py-3'>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder='인증번호 6자리를 입력해주세요'
                        className='h-full w-full border-none bg-transparent p-0 text-sm text-suppin-gray1 outline-none placeholder:text-suppin-gray3'
                      />
                    </FormControl>
                    <span className='text-xs text-suppin-gray2'>5:00</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type='button'
              variant='ghost'
              className='h-12 w-14 rounded-lg border border-suppin-main text-sm font-semibold text-suppin-main'
            >
              확인
            </Button>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 left-0 right-0 bg-white px-4 py-4'>
        <Button
          type='button'
          variant='ghost'
          onClick={stepHandler}
          className='flex h-[50px] w-full items-center justify-center rounded-md bg-suppin-main font-semibold text-white disabled:bg-suppin-gray3'
        >
          다음으로
        </Button>
      </div>
    </div>
  );
};
