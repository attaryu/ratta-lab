import type { Metadata } from 'next';
import { Bebas_Neue, Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
	weight: ['300', '400', '500', '600', '700'],
	subsets: ['latin'],
	variable: '--poppins',
});
const bebasNeue = Bebas_Neue({
	weight: '400',
	subsets: ['latin'],
	variable: '--bebas-neue',
});

export const metadata: Metadata = {
	title: 'Ratta Labolatory',
	description: 'This site for my animation experimences',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${poppins.variable} ${bebasNeue.variable}`}>
				{children}
				<footer className="px-8">
					<small className="text-sm mt-12">
						Part of{' '}
						<a
							href="https://m-attar.vercel.app"
							target="_blank"
							className="underline"
						>
							M Attar&apos;s
						</a>{' '}
            site.
					</small>
				</footer>
			</body>
		</html>
	);
}
