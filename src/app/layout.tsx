import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({ weight: ['300', '400', '500', '600', '700'] });

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
			<body className={poppins.className}>
				{children}
				<footer className="px-8">
					<small className="text-sm mt-12">
						Part of{' '}
						<a
							href="https://m-attar.vercel.app"
							target="_blank"
							className="underline"
						>
							M Attar's
						</a>{' '}
            site.
					</small>
				</footer>
			</body>
		</html>
	);
}
