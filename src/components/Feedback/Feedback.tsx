import styles from './Feedback.module.scss';
import Info from '../Info/Info';

type ReporterInfo = {
	photoUrl: string;
	name: string;
	citeUrl: string;
};

type FeedBackItem = {
	feedback: string;
	reporter: ReporterInfo;
};

type FeedbackProps = {
	data: FeedBackItem[];
};

export default function Feedback({ data }: FeedbackProps) {
	return (
		<>
			{data.map((item, i) => (
				<div className={styles.wrapper} key={i}>
					<Info text={item.feedback} />
					<div className={styles.author}>
						<img
							className={styles.author_image}
							src={item.reporter.photoUrl}
							alt="author image"
						/>
						<span className={styles.author_name}>
							{item.reporter.name},{' '}
							<a
								className={styles.author_site}
								href={item.reporter.citeUrl}
							>
								somesite.com
							</a>
						</span>
					</div>
				</div>
			))}
		</>
	);
}
