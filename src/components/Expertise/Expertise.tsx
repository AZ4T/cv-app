import styles from './Expertise.module.scss';

type ExpertiseInfo = {
	company: string;
	job: string;
	description: string;
};

type ExpertiseItem = {
	date: string;
	info: ExpertiseInfo;
};

type ExpertiseProps = {
	data: ExpertiseItem[];
};

export default function Expertise({ data }: ExpertiseProps) {
	return (
		<>
			<section>
				{data.map((item, i) => (
					<div key={i} className={styles.wrapper}>
						<div className={styles.left}>
							<h4 className={styles.company}>{item.info.company}</h4>
							<p className={styles.date}>{item.date}</p>
						</div>
						<div className={styles.right}>
							<p className={styles.job}>
								<strong>{item.info.job}</strong>
							</p>
							<p className={styles.description}>{item.info.description}</p>
						</div>
					</div>
				))}
			</section>
		</>
	);
}
