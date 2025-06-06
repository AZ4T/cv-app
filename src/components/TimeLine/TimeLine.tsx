import { useDispatch, useSelector } from 'react-redux';
import styles from './TimeLine.module.scss';
import type { AppDispatch } from '../../app/store';
import type { RootState } from '../../app/types';
import { useEffect } from 'react';
import { fetchEducations } from '../../features/education/educationSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

export default function TimeLine() {
	const dispatch = useDispatch<AppDispatch>();

	const items = useSelector((state: RootState) => state.education.items);

	const status = useSelector((state: RootState) => state.education.status);
	const errorMessage = useSelector(
		(state: RootState) => state.education.errorMessage
	);

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchEducations());
		}
	}, [status, dispatch]);

	if (status === 'loading') {
		return (
			<div className={styles.container}>
				<FontAwesomeIcon className={styles.icon} icon={faRotate} spin />
			</div>
		);
	}

	if (status === 'failed') {
		return (
			<div className={styles.container}>
				<div className={styles.errorText}>
					Something went wrong; please review your server connection!
					{errorMessage}
				</div>
			</div>
		);
	}

	return (
		<div className={styles.timeline}>
			{items.map((item, i) => (
				<div key={i} className={styles.item}>
					<div className={styles.arrow}></div>
					<div className={styles.date}>{item.date}</div>
					<div className={styles.content}>
						<h4>{item.title}</h4>
						<p>{item.text}</p>
					</div>
				</div>
			))}
		</div>
	);
}
