import { useEffect, useRef, useState } from 'react';
import styles from './Portfolio.module.scss';
import Isotope from 'isotope-layout';
import image1 from '../../assets/images/portfolio_item1.jpg';
import image2 from '../../assets/images/portfolio_item2.jpg';

type Item = {
	id: number;
	category: 'ui' | 'code';
	image: string;
	title: string;
	text: string;
	sourceUrl: string;
};

const items: Item[] = [
	{
		id: 1,
		category: 'ui',
		image: image1,
		title: 'Some text',
		text: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget,',
		sourceUrl: 'https://react.dev/',
	},
	{
		id: 2,
		category: 'code',
		image: image2,
		title: 'Another one',
		text: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis ',
		sourceUrl: 'https://react.dev/',
	},
	{
		id: 3,
		category: 'ui',
		image: image1,
		title: 'And again',
		text: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis ',
		sourceUrl: 'https://react.dev/',
	},
	{
		id: 4,
		category: 'code',
		image: image2,
		title: 'Last item',
		text: 'Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis ',
		sourceUrl: 'https://react.dev/',
	},
];

export default function Portfolio() {
	const [filterKey, setFilterKey] = useState<'*' | 'ui' | 'code'>('*');
	const iso = useRef<Isotope | null>(null);
	const grid = useRef<HTMLDivElement>(null);

	useEffect(() => {
		iso.current = new Isotope(grid.current!, {
			itemSelector: `.${styles.item}`,
			layoutMode: 'fitRows',
			percentPosition: true,
		});
		return () => iso.current?.destroy();
	}, []);

	useEffect(() => {
		if (!iso.current) return;
		const filterClass = filterKey === '*' ? '*' : `.${filterKey}`;
		iso.current.arrange({ filter: filterClass });
	}, [filterKey]);

	return (
		<>
			<div className={styles.tabs}>
				<button
					onClick={() => setFilterKey('*')}
					className={filterKey === '*' ? styles.active : ''}
				>
					All
				</button>
				<span>/</span>
				<button
					onClick={() => setFilterKey('code')}
					className={filterKey === 'code' ? styles.active : ''}
				>
					Code
				</button>
				<span>/</span>
				<button
					onClick={() => setFilterKey('ui')}
					className={filterKey === 'ui' ? styles.active : ''}
				>
					UI
				</button>
			</div>

			<div className={styles.grid} ref={grid}>
				{items.map((item) => (
					<div
						key={item.id}
						className={`${styles.item} ${item.category}`}
					>
						<img src={item.image} alt={item.title} />
						<div className={styles.details}>
							<h4>{item.title}</h4>
							<p className={styles.text}>{item.text}</p>
							<a href={item.sourceUrl}>View source</a>
						</div>
					</div>
				))}
			</div>
		</>
	);
}
