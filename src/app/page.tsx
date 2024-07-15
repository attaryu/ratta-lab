import Link from 'next/link';

export default function Home() {
	const creations = [
		{
			id: 1,
			title: 'Reveal',
			link: '/reveal',
		},
	];

	return (
		<main className="p-8">
			<article>
				<h1 className="font-semibold text-5xl">
					Hello Everyone! <br />
					Welcome to Ratta Lab!
				</h1>

				<p className="mt-8 text-lg">
					This site is for my front-end animation experiments. With Next JS, I
					use GSAP and Frame Motion for now. I hope my experiments inspired you
					to make something cool! Let&apos;s look at my experiments below
				</p>

				<ul className="mt-8 flex flex-wrap w-full gap-3">
					{creations.map((object) => (
						<li key={object.id}>
							<Link
								href={object.link}
								className="px-4 py-2 block border border-zinc-900 rounded-full"
							>
								{object.title}
							</Link>
						</li>
					))}
				</ul>
			</article>
		</main>
	);
}
