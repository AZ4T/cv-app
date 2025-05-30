import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faBriefcase,
	faBuildingColumns,
	faComment,
	faGem,
	faLocationArrow,
	faPen,
	faUser,
} from '@fortawesome/free-solid-svg-icons';
import styles from './Navigation.module.scss';
import { useEffect, useState } from 'react';

const LINKS = [
	{ id: 'about', icon: faUser, label: 'About me' },
	{ id: 'education', icon: faBuildingColumns, label: 'Education' },
	{ id: 'experience', icon: faPen, label: 'Experience' },
	{ id: 'skills', icon: faGem, label: 'Skills' },
	{ id: 'portfolio', icon: faBriefcase, label: 'Portfolio' },
	{ id: 'contacts', icon: faLocationArrow, label: 'Contacts' },
	{ id: 'feedbacks', icon: faComment, label: 'Feedbacks' },
];

export default function Navigation() {
	const [activeSection, setActiveSection] = useState<string>('about');

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveSection(entry.target.id);
					}
				});
			},
			{
				// Fire when the section’s midpoint hits the middle of the viewport
				rootMargin: '-50% 0px -50% 0px',
				threshold: 0, // default, “any intersection”
			}
		);

		LINKS.forEach(({ id }) => {
			const section = document.getElementById(id);
			if (section) observer.observe(section);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<nav className={styles.sidebar}>
			<ul>
				{LINKS.map(({ id, icon, label }) => (
					<li key={id}>
						<a
							href={`#${id}`}
							className={`${styles.navLink} ${
								activeSection === id ? styles.active : ''
							}`}
							onClick={(e) => {
								e.preventDefault();
								setActiveSection(id);
								document
									.getElementById(id)
									?.scrollIntoView({ behavior: 'smooth' });
							}}
						>
							<FontAwesomeIcon
								icon={icon}
								className={styles.icon}
							/>
							<span>{label}</span>
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}
