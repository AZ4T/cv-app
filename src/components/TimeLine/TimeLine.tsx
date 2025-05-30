import styles from './TimeLine.module.scss';

type TimeLineItem = {
	date: number;
	title: string;
	text: string;
};

type TimeLineProps = {
	data: TimeLineItem[];
};

export default function TimeLine({ data }: TimeLineProps) {
	return (
		<div className={styles.timeline}>
			{data.map((item, i) => (
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
