// [moduleId]/[bingoCardId]/client-wrapper.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BingoCard from '@/features/dashboard/Bingo/components/BingoCard';
import { getBingoCardByIndex, BingoCardData } from '@/features/dashboard/Bingo/api/bingo';
import LoaderCustom from '@/components/loader-custom/loader-custom';

export default function BingoCardClientWrapper() {
  const { moduleId, bingoCardId } = useParams() as {
    moduleId: string;
    bingoCardId: string;
  };

  const cardIndex = parseInt(bingoCardId, 10);
  const [card, setCard] = useState<BingoCardData | null>(null);

  useEffect(() => {
    if (!isNaN(cardIndex)) {
      getBingoCardByIndex(moduleId, cardIndex)
        .then(setCard)
        .catch(() => {
        });
    }
  }, [moduleId, cardIndex]);

  if (!card)
    return (
      <>
        <LoaderCustom />
      </>
    );

  return <BingoCard bingoCardId={cardIndex} keywords={card.keywords} />;
}
