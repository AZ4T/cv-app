import { useLocation } from 'react-router-dom';
import styles from './PhotoBox.module.scss';

type PhotoBoxProps = {
	name: string;
	title: string;
	description: string;
	avatar: string;
};

export default function PhotoBox({
	name,
	title,
	description,
	avatar,
}: PhotoBoxProps) {
	const { pathname } = useLocation();

	const isInner: boolean = pathname.includes('/inner');

	return (
		<>
			{isInner ? (
				<div className={styles.container}>
					<img
						className={styles.inner_image}
						src={avatar}
						alt="user avatar"
					/>
					<p className={styles.inner_name}>{name}</p>
				</div>
			) : (
				<div className={styles.wrapper}>
					<img
						className={styles.home_image}
						src={avatar}
						alt="user avatar"
					/>
					<h3 className={styles.home_name}>{name}</h3>
					<h4 className={styles.title}>{title}</h4>
					<p className={styles.description}>{description}</p>
				</div>
			)}
		</>
	);
}
