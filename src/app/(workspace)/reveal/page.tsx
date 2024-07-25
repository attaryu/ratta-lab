'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, useState } from 'react';

gsap.registerPlugin(useGSAP);

export default function Page() {
	const [loading, setLoading] = useState(0);
	const counterRef = useRef<HTMLSpanElement | null>(null);

	function setCounter() {
		const loadingLeft = 100 - loading;

		if (loadingLeft <= 10) {
			setLoading(loading + loadingLeft);
		} else {
			setLoading(loading + (Math.floor(Math.random() * 10) + 1));
		}
	}

	useGSAP(() => {
		if (window) {
			setCounter();
		}
	}, []);

	useGSAP(() => {
		if (loading === 100) {
			const barAnimation: GSAPTweenVars = {
				height: 0,
				duration: 1,
				ease: 'power4.inOut',
			};

			gsap
				.timeline()
				.to('.loading', { opacity: 0, duration: 0.4 })
				.to('.bar-1', barAnimation, '>+100%')
				.to('.bar-2', barAnimation, '<10%')
				.to('.bar-3', barAnimation, '<10%')
				.to('.bar-4', barAnimation, '<10%')
				.to('.bar-5', barAnimation, '<10%')
				.to('.bar-6', barAnimation, '<10%')
				.to('.bar-7', barAnimation, '<10%')
				.to('.bar-8', barAnimation, '<10%')
				.to('.bar-9', barAnimation, '<10%')
				.to('.bar-10', barAnimation, '<10%')
				.fromTo(
					'.h1',
					{ yPercent: 100 },
					{
						yPercent: 0,
						ease: 'power2.out',
						stagger: {
							amount: 0.6,
						},
					},
					'<20%'
				);
		}

		if (window && loading) {
			counterRef.current!.innerHTML = loading.toString();

			setTimeout(() => {
				if (loading <= 100) {
					setCounter();
				}
			}, Math.floor(Math.random() * 500) + 1);
		}
	}, [loading]);

	return (
		<main className="w-full h-svh overflow-hidden">
			<p className="loading flex z-20 fixed inset-0 text-white justify-end items-end p-12 font-bebas-neue font-bold">
				<span ref={counterRef} className="text-8xl">
					0
				</span>
				<span className="text-4xl mb-2">%</span>
			</p>

			<h1 className="flex z-10 fixed inset-0">
				<div className="bar-1 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-2 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-3 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-4 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-5 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-6 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-7 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-8 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-9 w-[10%] h-[100vh] bg-zinc-900" />
				<div className="bar-10 w-[10%] h-[100vh] bg-zinc-900" />
			</h1>

			<div className="container mx-auto relative">
				<nav className="sticky top-0 flex justify-between py-6">
					<a href="/#" className="font-poppins">About</a>
					<a href="/#" className="font-poppins">Contact</a>
					<a href="/#" className="font-poppins">Playground</a>
				</nav>

				<div className="w-full flex justify-center h-fit overflow-hidden selection:bg-zinc-900 selection:text-white">
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						F
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						A
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						R
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						I
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						E
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						T
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						T
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						O
					</span>
					<span className="h1 font-bebas-neue font-bold text-[15rem] leading-tight">
						.
					</span>
				</div>

				<div className="w-full aspect-[6/2] mx-auto rounded-xl">
					<img src="/test.jpg" alt="" className="w-full h-full object-cover" />
				</div>
			</div>
		</main>
	);
}
