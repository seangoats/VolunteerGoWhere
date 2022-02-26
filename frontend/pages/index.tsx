import Layout from '@/components/shared/Layout';
import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<title>VolunteerGoWhere</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Layout>Home page</Layout>
		</>
	);
}
