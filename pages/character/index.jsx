

import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/Character.module.css'

import Header from './Header.jsx'
import Location from './Location.jsx'
import Episodes from './Episodes.jsx'
import { useRouter } from 'next/router'





export async function getServerSideProps(context) {

	return {
		props: {
			info: await getInfo(context)
		},
	}
}



export default function Character({ info }) {

	const { response, status } = info
	const { character } = response

	const title = `Rick And Morty: ${character?.name || ''}`

	return (
		<>
		<Head>
			<title>{title}</title>
			<meta name="description" content="This app use rick and morty's api" />
			<meta name="description" content={character?.name} />
			<meta name="viewport" content="width=device-width, initial-scale=1" />

			<link rel="icon" href={character?.image} />
		</Head>

		{status === 'error' && ErrorPage({ info })}
		{status === 'success' && CharacterPage({ response, title })}
		</>
	)
}









const ErrorPage = ({ info }) => {

	const { error } = info.response

	return (
		<div className="error_container">
			{error}
		</div>
	)
}


const CharacterPage = ({ response, title }) => {

	const { character, location, origin, episodes } = response
	const router = useRouter()

	console.log()

	return (

		<section className={styles.main} >

			<section className="main_container" >

				<Header character={character} title={title} />

				<section className={styles.locations_section}>

					<Location location={origin} title="Origin" />
					<Location location={location} title="Location" />

				</section>

				<Episodes episodes={episodes} />

			</section>

			<button className={styles.btn_to_to_home} onClick={router.back}>
				Go to home
			</button>

		</section>
	)
}









const getLocations = async (originId, locationId) => {

	const result = await fetch(`https://rickandmortyapi.com/api/location/${originId},${locationId}`)
	const data = await result.json()

	const origin = {
		...(data[0] || {}),
		id: originId,
	}

	const location = {
		...(data[1] || {}),
		id: locationId,
	}

	return { origin, location }
}



const getEpisodes = async (episodes) => {

	const episodesIds = episodes.map(url => url.slice(40)).join(',')
	const result = await fetch(`https://rickandmortyapi.com/api/episode/${episodesIds}`)
	const data = await result.json()

	if (episodes.length === 0) {
		return []
	}

	if (episodes.length === 1) {
		return [ data ]
	}

	return data
}




const getInfo = async (context) => {

	try {

		const id = context.query?.id || 1
		const result = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
		const data = await result.json()

		const { origin, location } = await getLocations(data.origin.url.slice(41), data.location.url.slice(41))
		const episodes = await getEpisodes(data.episode)

		if (data.error) {
			throw data.error
		}

		return {
			status: 'success',
			response: {
				id,
				origin,
				location,
				episodes,
				character: data,
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