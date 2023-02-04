

import styles from '@/styles/Character.module.css'



export default function Eposiodes ({ episodes }) {

	const episodesArray = episodes || []

	return (

		<div className={styles.info_content}>

			<div className="title">Episodes</div>

			<section className="episodes_grid">

				<Episode isHeader={true} />

				{
					episodesArray.map(episodeData => (
						<Episode key={episodeData.id} episodeData={episodeData} />
					))
				}

			</section>

		</div>
	)
}



function Episode ({ episodeData, isHeader }) {

	const name = isHeader ? 'Name' : episodeData.name
	const episode = isHeader ? 'Episode' : episodeData.episode.slice(4)
	const season = isHeader ? 'Season' : episodeData.episode.slice(1, 3)

	return (

		<div className="episode_row">

			<span> {name} </span>
			<span> {season} </span>
			<span> {episode} </span>

		</div>
	)
}

