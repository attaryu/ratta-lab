'use client';

import type { MutableRefObject } from 'react';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef } from 'react';
import SplitType from 'split-type';

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
	children: string;
	element: 'h1' | 'p';
	timelineRef?:
		| MutableRefObject<GSAPTimeline | undefined>
		| ((timeline: GSAPTimeline) => void);
}

gsap.registerPlugin(useGSAP);

export default function RevealText({
	children,
	element,
	className,
	timelineRef,
	...attributes
}: Readonly<Props>) {
	const textRef = useRef<HTMLHeadingElement | null>(null);

	useGSAP(
		() => {
			if (textRef.current) {
				// spliting the text
				const splitText = new SplitType(textRef.current, {
					tagName: 'span',
					// make custom class each line for swiping effect with pseudo element (before)
					lineClass:
						"line relative before:contents-[''] before:block before:h-full before:w-[var(--width)] before:bg-zinc-950 before:absolute before:top-0 before:left-[var(--left)] before:right-[var(--right)] p-1",
				});

				const timeline = gsap
					.timeline()
					// because gsap can't do animation directly to pseudo element (as i know), i make a custom variable for pseudo element value
					.set(splitText.lines, {
						'--width': '0%',
						'--left': 0,
						'--right': 'auto',
						width: 'fit-content',
					})
					.to(splitText.lines, {
						'--width': '100%',
						stagger: { amount: 0.3 },
						ease: 'power4.out',
					})
					.set(splitText.lines, { color: 'black' })
					.set(splitText.lines, { '--right': 0, '--left': 'auto' })
					.to(splitText.lines, {
						'--width': '0%',
						stagger: { amount: 0.3 },
						ease: 'power4.out',
					});

				if (typeof timelineRef === 'object') {
					timelineRef.current = timeline;
				} else if (typeof timelineRef === 'function') {
					timelineRef(timeline);
				} else {
					timeline.play();
				}
			}
		},
		{ scope: textRef, dependencies: [] }
	);

	if (element === 'h1') {
		return (
			<h1
				ref={textRef}
				className={`${className ?? ''} space-y-1 text-transparent`}
				{...attributes}
			>
				{children}
			</h1>
		);
	}

	return (
		<p
			ref={textRef}
			className={`${className ?? ''} space-y-1 text-transparent`}
			{...attributes}
		>
			{children}
		</p>
	);
}
