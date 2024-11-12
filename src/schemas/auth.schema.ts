import { z } from 'zod';

const removeWhiteSpace = (str: string) => str.replace(/\s/g, '');

const formatPhoneNumber = (num: string) => {
  const cleaned = num.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return cleaned;
};

export const termsSchema = z.object({
  ageOver14Agree: z.boolean(),
  serviceUseAgree: z.boolean(),
  personalInfoAgree: z.boolean(),
  marketingAgree: z.boolean(),
});

export const signUpFormSchema = z
  .object({
    termsAgree: termsSchema,

    userId: z
      .string()
      .transform(removeWhiteSpace)
      .refine((val) => /^[a-z0-9]+$/.test(val), {
        message: '아이디는 영문 소문자와 숫자만 사용 가능합니다.',
      })
      .refine((val) => val.length >= 4 && val.length <= 30, {
        message: '아이디는 4자 이상 30자 이하여야 합니다.',
      }),

    password: z
      .string()
      .transform(removeWhiteSpace)
      .refine((val) => /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(val), {
        message:
          '비밀번호는 영문 소문자, 숫자, 특수문자를 모두 포함해야 합니다.',
      })
      .refine((val) => val.length >= 8 && val.length <= 20, {
        message: '비밀번호는 8자 이상 20자 이하여야 합니다.',
      }),

    passwordConfirm: z.string(),

    userType: z.enum(['인플루언서', '마케팅 대행사', '브랜딩 담당자']),

    name: z
      .string()
      .transform(removeWhiteSpace)
      .refine((val) => /^[가-힣]+$/.test(val), {
        message: '이름은 한글만 입력 가능합니다.',
      })
      .refine((val) => val.length >= 2 && val.length <= 10, {
        message: '이름은 2자 이상 10자 이하여야 합니다.',
      }),

    email: z
      .string()
      .email('올바른 이메일 형식이 아닙니다.')
      .transform(removeWhiteSpace),

    phone: z
      .string()
      .transform(removeWhiteSpace)
      .refine((val) => /^010\d{8}$/.test(val.replace(/-/g, '')), {
        message: '올바른 휴대폰 번호 형식이 아닙니다.',
      })
      .transform(formatPhoneNumber),

    verificationCode: z
      .string()
      .transform(removeWhiteSpace)
      .refine((val) => /^\d{6}$/.test(val), {
        message: '인증번호는 6자리 숫자여야 합니다.',
      }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirm'],
  });

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;

const usernameSchema = z
  .string()
  .min(4, { message: 'ID는 최소 4자 이상이어야 합니다.' })
  .max(30, { message: 'ID는 최대 30자 이하여야 합니다.' })
  .regex(/^[a-z0-9]+$/, { message: 'ID는 소문자와 숫자만 포함할 수 있습니다.' })
  .transform(removeWhiteSpace);

const passwordSchema = z
  .string()
  .min(8, { message: '비밀번호는 최소 8자 이상이어야 합니다.' })
  .max(20, { message: '비밀번호는 최대 20자 이하여야 합니다.' })
  .regex(/^(?=.*[a-z])(?=.*\d)(?=.*[\W_]).*$/, {
    message: '비밀번호는 영문 소문자, 숫자, 특수문자를 포함해야 합니다.',
  })
  .transform(removeWhiteSpace);

export const changePasswordSchema = z
  .object({
    currentPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmNewPassword: passwordSchema,
  })
  .superRefine(({ newPassword, confirmNewPassword }, ctx) => {
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: '새 비밀번호와 비밀번호 확인이 일치하지 않습니다.',
        path: ['confirmNewPassword'],
      });
    }
  });

export const signinSchema = z.object({
  userId: usernameSchema,
  password: passwordSchema,
});

export type SigninType = z.infer<typeof signinSchema>;
export type SignupPayload = {
  userType?: string | undefined;
  termsAgree: {
    ageOver14Agree: boolean;
    serviceUseAgree: boolean;
    personalInfoAgree: boolean;
    marketingAgree: boolean;
  };
  userId: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  verificationCode: string;
};
export type ChangePasswordType = z.infer<typeof changePasswordSchema>;
