'use client';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store';
import {
  BadgeInfo,
  Flame,
  MinusSquare,
  PanelBottom,
  Square,
  SquareEqual,
  TrendingUp,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 *
 * @param { { params: string[] }} param0
 * @returns
 */
export const ListingControl = ({ params }) => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState('');

  const [r, topic = 'popular', type = 'hot'] = params;
  const cardType = useStore((state) => state.cardType);
  const setCardType = useStore((state) => state.setCardType);

  /**
   *
   * @param {String} value
   * @returns
   */
  const isActive = (value) => {
    if (type === value) {
      return 'rounded-xl bg-slate-400 ';
    }

    return '';
  };

  /**
   *
   * @param {String} topicType
   */
  const handleChangeType = (topicType) => {
    router.push(`/${r}/${topic}/${topicType}`);
  };

  const SelectedCardType = () => {
    if (cardType === 'Card') {
      return <Square />;
    }

    if (cardType === 'Classic') {
      return <MinusSquare />;
    }

    if (cardType === 'Compact') {
      return <SquareEqual />;
    }
  };

  return (
    <Card className="w-full flex justify-between mb-6 p-4">
      <div className="flex gap-2">
        <div
          className={`flex gap-1 p-2 cursor-pointer ${isActive('hot')}`}
          onClick={() => handleChangeType('hot')}
        >
          <Flame className="h-6 w-6" />
          <span>Hot</span>
        </div>
        <div
          className={`flex gap-1 p-2 cursor-pointer ${isActive('new')}`}
          onClick={() => handleChangeType('new')}
        >
          <BadgeInfo className="h-6 w-6" />
          <span>New</span>
        </div>
        <div
          className={`flex gap-1 p-2 cursor-pointer ${isActive('top')}`}
          onClick={() => handleChangeType('top')}
        >
          <TrendingUp className="h-6 w-6" />
          <span>Top</span>
        </div>
      </div>
      <div className="flex-auto px-4">
        <Input
          className="w-full"
          placeholder="Search Reddity"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              router.push(`/${r}/${searchValue}/${type}`);
            }
          }}
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <SelectedCardType />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setCardType('Card')}>
              <Square className="mr-1" />
              <span>Card</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCardType('Classic')}>
              <MinusSquare className="mr-1" />
              <span>Classic</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setCardType('Compact')}>
              <SquareEqual className="mr-1" />
              <span>Compact</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </Card>
  );
};

export default ListingControl;
