
import Image from 'next/image'
import styles from '@/styles/Character.module.css'



export default function renderPage ({ character, title }) {

	return (

		<section className={styles.header} >

			<Image alt={title} src={character?.image} />

			<div className={styles.info_content}>
				
				<div className="title">{character?.name}</div>

				<div className="info_items">

					<span className="item"><b>Status:</b> {character?.status}</span>
					<span className="item"><b>Species:</b> {character?.species}</span>
					<span className="item"><b>Gender:</b> {character?.gender}</span>
					<span className="item"><b>Origin:</b> {character?.origin?.name}</span>
					<span className="item"><b>Location:</b> {character?.location?.name}</span>
					<span className="item"><b>Episodes:</b> {character?.episode?.length}</span>

				</div>

			</div>

		</section>

	)
}
