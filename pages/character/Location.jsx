

import styles from '@/styles/Character.module.css'



export default function renderLocation ({ location, title }) {

	return (

		<div className={styles.info_content}>

			<div className="title">{title}</div>

			<div className="info_items">

				<span className="item"><b>Name:</b> {location?.name}</span>
				<span className="item"><b>Type:</b> {location?.type}</span>
				<span className="item"><b>Dimension:</b> {location?.dimension}</span>
				<span className="item"><b>Characters Residents:</b> {location?.residents?.length}</span>

			</div>

		</div>
	)
}
