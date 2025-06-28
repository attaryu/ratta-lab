/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import Card from './Card';

export interface Data {
  id: number;
  title: string;
  short_description: string;
  published_at: string;
}

const data: Data[] = [
  {
    id: 1,
    title: 'test 1',
    short_description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo perspiciatis velit corrupti.',
    published_at: '12/11/2024',
  },
  {
    id: 2,
    title: 'test 2',
    short_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt in sunt fugiat suscipit nemo maiores quas.',
    published_at: '12/11/2024',
  },
  {
    id: 3,
    title: 'test 3',
    short_description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    published_at: '12/11/2024',
  },
];


export default function Page() {
  const [isAnimated, setAnimated] = useState(false);
  const [activeCard, setActiveCard] = useState(data[0].id);

  return (
    <div className="h-svh w-full flex justify-center items-center px-24">
      <div className="flex w-full gap-px p-px bg-zinc-900 ">
        {data.map((data) => (
          <Card
            key={data.id}
            data={data}
            isActive={data.id === activeCard}
            isAnimated={isAnimated}
            setActive={setActiveCard}
            setAnimated={setAnimated}
          />
        ))}
      </div>
    </div>
  )
}
