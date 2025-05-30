import type { ReactNode } from 'react';
import styles from './Box.module.scss';

type BoxProps = {
	title: string;
	content: ReactNode;
};


export default function Box({ title, content }: BoxProps) {
	return (
		<div className={styles.container}>
			<h3 className={styles.title}>{title}</h3>
			<p className={styles.content}>{content}</p>
		</div>
	);
};
