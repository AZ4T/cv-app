import styles from './Home.module.scss';
import Button from '../../components/Button/Button';
import PhotoBox from '../../components/PhotoBox/PhotoBox';
import { Link } from 'react-router-dom';

export default function Home() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<PhotoBox
					name="John Doe"
					title="Programmer. Creative. Innovator"
					description="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque"
					avatar="http://avatars0.githubusercontent.com/u/246180?v=4"
				/>
				<Link to='/inner'>
					<Button text="Know more" />
				</Link>
			</div>
		</div>
	);
}
