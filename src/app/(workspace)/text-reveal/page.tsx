'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

import Link from 'next/link';
import { useRef } from 'react';
import RevealText from './RevealText';

gsap.registerPlugin(useGSAP);

export default function Page() {
  const titleRevealTextReference = useRef<GSAPTimeline>(null);
  const paragraphRevealTextReference = useRef<GSAPTimeline>(null);
  const storeRevealTextReference = useRef<GSAPTimeline[]>([]);

  useGSAP(() => {
    if (
      titleRevealTextReference.current &&
      paragraphRevealTextReference.current
    ) {
      const timeline = gsap
        .timeline()
        .add(titleRevealTextReference.current)
        .add(paragraphRevealTextReference.current, '<30%');

      storeRevealTextReference.current.forEach((tl, i) => {
        if (!i) {
          timeline.add(tl);
        } else {
          timeline.add(tl, '<5%');
        }
      });
    }
  }, []);

  function addStoreRevealTextReference(timeline: GSAPTimeline) {
    storeRevealTextReference.current.push(timeline);
  }

  return (
    <main>
      <nav className="flex items-center justify-between fixed top-0 inset-x-0 py-1.5 px-3 border border-b-zinc-950">
        <div className="font-bebas-neue text-2xl">Aigo.</div>

        <ul className="flex items-center gap-6 font-poppins">
          <li>
            <Link href="/text-reveal">product</Link>
          </li>
          <li>
            <Link href="/text-reveal">gallery</Link>
          </li>
          <li>
            <Link href="/text-reveal">about</Link>
          </li>
        </ul>
      </nav>

      <section className="w-full h-svh flex flex-col justify-end items-center px-12 py-4 gap-2">
        <RevealText
          element="h1"
          timelineRef={titleRevealTextReference}
          className="font-bebas-neue text-[10rem] leading-none mt-auto"
        >
          AIGO.
        </RevealText>

        <RevealText
          element="p"
          timelineRef={paragraphRevealTextReference}
          className="font-poppins mb-auto"
        >
          Shoe production, high mutuality, youthful spirit
        </RevealText>

        <div className="flex justify-between items-center w-full font-poppins text-sm">
          <RevealText
            element="p"
            timelineRef={addStoreRevealTextReference}
          >
            AIGO ltd.
          </RevealText>
          <RevealText
            element="p"
            timelineRef={addStoreRevealTextReference}
          >
            RENEWALE .co
          </RevealText>
          <RevealText
            element="p"
            timelineRef={addStoreRevealTextReference}
          >
            ReStandarize LB
          </RevealText>
          <RevealText
            element="p"
            timelineRef={addStoreRevealTextReference}
          >
            WallStreet
          </RevealText>
          <RevealText
            element="p"
            timelineRef={addStoreRevealTextReference}
          >
            Malefi Store
          </RevealText>
          <RevealText
            element="p"
            timelineRef={addStoreRevealTextReference}
          >
            Stereo Kick
          </RevealText>
        </div>
      </section>
    </main>
  );
}
