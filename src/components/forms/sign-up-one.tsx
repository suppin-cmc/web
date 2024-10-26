import { CheckIcon, ChevronRight } from '@/components/ui/icons';
import { cn } from '@/lib/utils';
import { memo, useCallback, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';

const signUpOneItems = [
  { id: '1', label: '모두 동의', isChecked: false, href: null },
  {
    id: '2',
    label: '(필수) 만 14세 이상입니다.',
    isChecked: false,
    href: null,
  },
  {
    id: '3',
    label: '(필수) 서비스 이용약관 동의',
    isChecked: false,
    href: '#',
  },
  {
    id: '4',
    label: '(필수) 개인정보 처리방침 동의',
    isChecked: false,
    href: '#',
  },
  { id: '5', label: '(선택) 마케팅 수신 동의 ', isChecked: false, href: '#' },
];

export const SignUpOne = memo(
  ({ step, stepHandler }: { step: string | null; stepHandler: () => void }) => {
    const [items, setItems] = useState<typeof signUpOneItems>(signUpOneItems);

    const essItems = items.filter((item) => item.isChecked);
    const isEnabled =
      essItems.includes(items[1]) &&
      essItems.includes(items[2]) &&
      essItems.includes(items[3]);

    const handleCheckboxClick = useCallback((clickedId: string) => {
      setItems((prevItems) => {
        const newItems = [...prevItems];

        if (clickedId === '1') {
          const isAllChecked = !newItems[0].isChecked;
          return newItems.map((item) => ({
            ...item,
            isChecked: isAllChecked,
          }));
        }

        const itemIndex = newItems.findIndex((item) => item.id === clickedId);
        newItems[itemIndex] = {
          ...newItems[itemIndex],
          isChecked: !newItems[itemIndex].isChecked,
        };

        const allOthersChecked = newItems
          .slice(1)
          .every((item) => item.isChecked);
        newItems[0] = {
          ...newItems[0],
          isChecked: allOthersChecked,
        };

        return newItems;
      });
    }, []);

    return (
      <div
        className={cn(
          'flex flex-col gap-8',
          step === '1' ? 'opacity-100' : 'opacity-0',
        )}
      >
        <h1 className='text-2xl font-semibold text-suppin-gray1'>
          약관에 동의해주세요
        </h1>
        <div className='flex flex-col'>
          {items.map((item) => (
            <div key={item.id} className='flex items-center justify-between'>
              <CheckBox item={item} onCheck={handleCheckboxClick} />
              {item.href && (
                <a href={item.href} target='_blank'>
                  <ChevronRight />
                </a>
              )}
            </div>
          ))}
        </div>
        <Button
          variant='ghost'
          disabled={!isEnabled}
          onClick={stepHandler}
          className='absolute bottom-10 left-0 flex h-[50px] w-full items-center justify-center rounded-md bg-suppin-main font-semibold text-white disabled:bg-suppin-gray3'
        >
          다음으로
        </Button>
      </div>
    );
  },
);
SignUpOne.displayName = 'SignUpOne';

const CheckBox = memo(
  ({
    item,
    onCheck,
  }: {
    item: { id: string; label: string; isChecked: boolean };
    onCheck: (id: string) => void;
  }) => {
    return (
      <div
        className={cn(
          'flex min-h-10 w-full gap-2.5 p-2.5',
          item.id === '1' ? 'items-start' : 'items-center',
        )}
      >
        <CheckIcon
          onClick={() => onCheck(item.id)}
          isChecked={item.isChecked}
        />
        {item.id === '1' ? (
          <div className='flex w-full flex-col gap-2.5'>
            <span className='font-semibold text-[#3F3F3F]'>{item.label}</span>
            <span className='text-xs font-medium text-[#787878]'>
              서비스 이용을 위해 아래의 약관을 모두 동의합니다.
            </span>
            <Separator className='h-[1px] w-full bg-suppin-gray4' />
          </div>
        ) : (
          <span className='font-semibold text-[#3F3F3F]'>{item.label}</span>
        )}
      </div>
    );
  },
);
CheckBox.displayName = 'CheckBox';
