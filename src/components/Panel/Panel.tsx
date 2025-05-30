import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import Navigation from '../Navigation/Navigation';
import PhotoBox from '../PhotoBox/PhotoBox';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Panel.module.scss';

type PanelProps = {
	collapsed: boolean;
	onToggle: () => void;
};

export default function Panel({ collapsed, onToggle }: PanelProps) {
	return (
		<>
			<aside
				className={
					collapsed
						? `${styles.container} ${styles.collapsed}`
						: styles.container
				}
			>
				<button className={styles.menu} onClick={onToggle}>
					<svg
						className={styles.menu_icon}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 448 512"
					>
						<path d="M0 96C0 78.3 14.3 64 32 64l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 128C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32l384 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 288c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32L32 448c-17.7 0-32-14.3-32-32s14.3-32 32-32l384 0c17.7 0 32 14.3 32 32z" />
					</svg>
				</button>
				<div className={styles.up}>
					<PhotoBox
						name="John Doe"
						title="Programmer. Creative. Innovator"
						description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
						avatar="http://avatars0.githubusercontent.com/u/246180?v=4"
					/>
					<Navigation />
				</div>
				<div className={styles.down}>
					<Link to="/">
						<Button
							icon={faChevronLeft}
							text="Go Back"
							classNameButton={styles.button}
							classNameText={styles.text}
						/>
					</Link>
				</div>
			</aside>
		</>
	);
}
