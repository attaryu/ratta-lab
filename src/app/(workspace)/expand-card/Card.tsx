'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';

import { Data } from './page';

interface Props {
  data: Data;
  isAnimated: boolean;
  isActive: boolean;
  setActive: (id: number) => void;
  setAnimated: (state: boolean) => void;
}

gsap.registerPlugin(useGSAP);

export default function Card({ data, isAnimated, isActive, setActive, setAnimated }: Props) {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const subTitleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!isActive) {
      gsap.timeline()
        .set(cardContainerRef.current, { flexGrow: '0' })
        .set(headerRef.current, {
          width: cardContainerRef.current!.getBoundingClientRect().height,
          height: cardContainerRef.current!.getBoundingClientRect().width,
          visibility: 'visible',
          rotate: 90,
        })
        .set([imageRef.current, footerRef.current], { height: '0%', visibility: 'hidden' })
        .set(subTitleRef.current, { visibility: 'visible' })
    }
  }, []);

  useGSAP(() => {
    if (isAnimated) {
      const timeline = gsap.timeline()

      if (isActive) {
        timeline
          .to(headerRef.current, { autoAlpha: 0 })
          .set(headerRef.current, { rotate: '0deg' })
          .set(subTitleRef.current, { visibility: 'hidden' })
          .set(headerRef.current, { height: '100%', width: '100%' })
          .set([footerRef.current, imageRef.current], { visibility: 'visible' })
          .to(headerRef.current, { autoAlpha: 1 })
          .to(cardContainerRef.current, { flexGrow: '1' }, '<')
          .to(imageRef.current, { height: '100%' })
          .to(headerRef.current, { height: 'auto' }, '<')
          .to(footerRef.current, { height: 'auto' }, '<70%')
      } else {
        timeline
          .to(footerRef.current, { height: '0%' })
          .to(headerRef.current, { height: '100%' }, '<70%')
          .to(imageRef.current, { height: '0%' }, '<')
          .to(cardContainerRef.current, { flexGrow: 0 })
          .to(headerRef.current, { autoAlpha: 0 }, '<')
          .set([footerRef.current, imageRef.current], { visibility: 'hidden' })
          .set(headerRef.current, {
            width: cardContainerRef.current!.getBoundingClientRect().height,
            height: cardContainerRef.current!.getBoundingClientRect().width,
          })
          .set(subTitleRef.current, { visibility: 'visible' })
          .set(headerRef.current, { rotate: '90deg' })
          .to(headerRef.current, { autoAlpha: 1 })
      }

      timeline.call(() => setAnimated(false));
    }
  }, [isActive]);

  function clickHandler() {
    if (!isAnimated && !isActive) {
      setActive(data.id);
      setAnimated(true);
    }
  }

  return (
    <section className="h-137.5 grow flex flex-col basis-14 items-center justify-center overflow-hidden bg-white" onClick={clickHandler} ref={cardContainerRef}>
      {/* header */}
      <div className="flex justify-between items-center p-2 w-full" ref={headerRef}>
        <p className="font-semibold uppercase">Project {data.id}</p>

        <h2 className="text-lg font-bold uppercase invisible" ref={subTitleRef}>
          {data.title}
        </h2>

        <time className="text-sm" dateTime="23/11/2942">{data.published_at.split('/').join('. ')}</time>
      </div>

      {/* image */}
      <div className="border-y border-zinc-900 w-full bg-cover bg-center grayscale h-full" style={{ backgroundImage: 'url("/test.jpg")' }} ref={imageRef} />

      {/* footer */}
      <div className="bg-white xl:flex w-full" ref={footerRef}>
        <div className="px-2 py-4 space-y-1 xl:w-full">
          <h2 className="text-2xl font-bold uppercase">{data.title}</h2>

          <p>{data.short_description}</p>
        </div>

        <button className="text-lg py-2 px-3 bg-zinc-900 transition-colors text-white w-full xl:w-1/6 font-semibold hover:bg-zinc-950">
          Detail
        </button>
      </div>
    </section>
  )
}
