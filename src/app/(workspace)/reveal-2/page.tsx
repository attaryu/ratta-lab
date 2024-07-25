'use client';

import type { DotLottie } from '@lottiefiles/dotlottie-react';

import { useGSAP } from '@gsap/react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

export default function Page() {
	const [loading, setLoading] = useState(0);
	const [animatedElement, setAnimatedElement] = useState<DotLottie | null>(
		null
	);
	const counterElement = useRef<HTMLSpanElement | null>(null);

	function updateCounter() {
		setLoading((lastLoading) => {
			const left = 100 - lastLoading;

			if (left <= 10) {
				return lastLoading + left;
			} else {
				return lastLoading + Math.floor(Math.random() * 10) + 1;
			}
		});
	}

	useEffect(() => {
		if (window) {
			counterElement.current!.innerHTML = loading.toString();

			setTimeout(() => {
				if (loading <= 100) {
					updateCounter();
				}
			}, Math.floor(Math.random() * 600) + 1);
		}
	}, [loading]);

	useGSAP(() => {
		if (loading === 100) {
			setTimeout(() => {
				animatedElement?.play();
			}, 400);

			animatedElement?.addEventListener('complete', () => {
				setTimeout(() => {
					gsap
						.timeline()
						.to('.lottie', { display: 'none', duration: 0 })
						.to('.zoomer', { display: 'block', duration: 0 })
						.to('.logo-container', {
							width: '750%',
							duration: 2,
							ease: 'power4.inOut',
						})
						.to('.loading-container', { autoAlpha: 0 })
						.to('.loading-container', { display: 'none' })
						.to('.outer-container', {
							overflow: 'auto',
							height: 'auto',
							duration: 0,
						});
				}, 400);
			});
		}

		return () => {
			animatedElement && animatedElement.removeEventListener('complete');
		};
	}, [loading]);

	return (
		<main className="outer-container w-full h-svh overflow-hidden relative">
			{/* loading layer */}
			<div className="loading-container absolute top-0 left-0 bg-zinc-950 h-screen w-full flex justify-center items-center flex-col overflow-hidden">
				<div className="logo-container w-1/6">
					<DotLottieReact
						src="/logo-2.json"
						speed={0.9}
						dotLottieRefCallback={(e) => setAnimatedElement(e)}
						className="lottie"
					/>

					<img src="/logo-after.svg" alt="" className="zoomer w-full hidden" />
				</div>

				<p className="text-white text-xl mt-10 font-bebas-neue">
					<span ref={counterElement}>0</span>
					<span>%</span>
				</p>
				<p className="text-white font-poppins">pretend to load...</p>
			</div>

			{/* main layer */}
			<div className="container mx-auto px-4 pb-10">
				<nav className="w-full flex justify-between py-4">
					<a href="/#" className="font-poppins">Project</a>
					<a href="/#" className="font-poppins">About</a>
					<a href="/#" className="font-poppins">Contact</a>
				</nav>

				<div className="w-full">
					<img
						src="/test.jpg"
						alt=""
						className="aspect-[8/2] w-full object-cover mb-8"
					/>
					<h1 className="font-bebas-neue text-[18vw] leading-none">
						MALEFI STUDIO.
					</h1>
					<p className="text-[2vw] -mt-6 font-poppins">
						Transforming Art into Digital Mastery
					</p>
				</div>
			</div>
		</main>
	);
}
