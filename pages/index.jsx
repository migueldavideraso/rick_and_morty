
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'

import { localePagerInfo } from '@/utils.js'
import Pager from 'rc-pagination'
import 'rc-pagination/assets/index.css'



export default function Home({ info }) {

	return (
		<>
		<Head>
			<title>Rick And Morty Info</title>
			<meta name="description" content="This app use rick and morty's api" />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
		</Head>

		{info.status === 'error' && ErrorPage({ info })}
		{info.status === 'success' && HomePage({ info })}
		</>
	)
}









const ErrorPage = ({ info }) => {

	const { error } = info.response

	return (
		<div className={styles.error_container}>
			{error}
		</div>
	)
}


const HomePage = ({ info }) => {

	const router = useRouter()
	const characters = info.response?.characters || []

	const onChangePage = (newPage) => {
		router.push(`./?page=${newPage}`)
	}

	return (

		<section className={styles.main} >

			<header className={styles.header} >
				<div className="title">Rick And Morty: Characters</div>
			</header>

			<main className={styles.content_container}>

				<div className={styles.content}>

					{characters.map((character, index) => (

						<div key={character.id} className={styles.card}>

							<Link
								className={styles.mask}
								href={`./character/?id=${character.id}`}
							>
								See More
							</Link>

							<img alt={character.name} src={character.image} />

							<div className={styles.title}>
								{character.name}
							</div>

						</div>
					))}
				</div>

			</main>

			<Pager
				className={styles.pager}
				showTitle={false}
				defaultPageSize={1}
				onChange={onChangePage}
				total={info.response.pages}
				defaultCurrent={info.response.page}
			/>

		</section>
	)
}












export async function getServerSideProps(context) {

	return {
		props: {
			info: await getInfo(context)
		},
	}
}





const getInfo = async (context) => {

	try {

		const page = context.query?.page || 1
		const result = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
		const data = await result.json()

		if (data.error) {
			throw data.error
		}

		const { pages, count } = data.info

		const nextPage = page + 1
		const previousPage = page - 1

		const characters = data.results

		return {
			status: 'success',
			response: {
				previousPage,
				characters,
				nextPage,
				pages,
				count,
				page,
			},
		}
	}
	catch (e) {
		return {
			status: 'error',
			response: { error: e.toString() },
		}
	}

	return null
}