import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { signinSchema, SigninType } from '@/schemas/auth.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';

export function SignInForm() {
  const form = useForm<SigninType>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      userId: '',
      password: '',
    },
  });

  const submitHandler = (values: SigninType) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitHandler)}
        className='flex w-full flex-col gap-3'
      >
        <FormField
          control={form.control}
          name='userId'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder='아이디'
                  className='border-suppin-gray4 placeholder:text-suppin-gray3 text-suppin-gray1 h-[50px] w-full rounded-md bg-transparent px-5 py-3 text-sm'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type='password'
                  placeholder='비밀번호'
                  className='border-suppin-gray4 placeholder:text-suppin-gray3 text-suppin-gray1 h-[50px] w-full rounded-md bg-transparent px-5 py-3 text-sm'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className='flex w-full flex-col gap-4'>
          <Button
            type='submit'
            variant='ghost'
            className='disabled:bg-suppin-gray3 bg-suppin-main h-[50px] w-full rounded-md text-center text-white disabled:text-white'
          >
            로그인
          </Button>
          <Link
            to='/sign-up'
            className='text-suppin-gray2 w-full text-center text-sm font-semibold'
          >
            회원가입
          </Link>
        </div>
      </form>
    </Form>
  );
}
