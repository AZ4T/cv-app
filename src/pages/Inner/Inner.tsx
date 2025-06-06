import styles from './Inner.module.scss';
import Box from '../../components/Box/Box';
import Expertise from '../../components/Expertise/Expertise';
import Feedback from '../../components/Feedback/Feedback';
import Panel from '../../components/Panel/Panel';
import Address from '../../components/Address/Address';
import Portfolio from '../../components/Portfolio/Portfolio';
import userPhoto from '../../assets/images/user.jpg';
import Button from '../../components/Button/Button';
import TimeLine from '../../components/TimeLine/TimeLine';
import { useState } from 'react';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Skills from '../../components/Skills/Skills';

export default function Inner() {
	const [collapsed, setCollapsed] = useState(false);
	return (
		<main className={styles.container}>
			<div
				className={
					collapsed
						? `${styles.sidebar} ${styles.collapsed}`
						: styles.sidebar
				}
			>
				<Panel
					collapsed={collapsed}
					onToggle={() => setCollapsed((c) => !c)}
				/>
			</div>
			<div className={styles.wrapper}>
				<div
					className={
						collapsed
							? `${styles.content} ${styles.collapsed}`
							: styles.content
					}
				>
					<section id="about">
						<Box
							title="About me"
							content="Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque"
						/>
					</section>
					<section id="education">
						<Box title="Education" content={<TimeLine />} />
					</section>
					<section id="experience">
						<Box
							title="Experience"
							content={
								<Expertise
									data={[
										{
											date: '2013-2014',
											info: {
												company: 'Google',
												job: 'Front-end developer / php programmer',
												description:
													'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
											},
										},
										{
											date: '2012',
											info: {
												company: 'Twitter',
												job: 'Web developer',
												description:
													'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
											},
										},
									]}
								/>
							}
						/>
					</section>
					<section id="skills">
						<Skills />
					</section>
					<section id="portfolio">
						<Box title="Portfolio" content={<Portfolio />} />
					</section>
					<section id="contacts">
						<Box title="Contacts" content={<Address />} />
					</section>
					<section id="feedbacks">
						<Box
							title="Feedbacks"
							content={
								<Feedback
									data={[
										{
											feedback:
												'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
											reporter: {
												photoUrl: userPhoto,
												name: 'Martin Friman Programmer',
												citeUrl:
													'https://www.citeexample.com',
											},
										},
										{
											feedback:
												'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolorLorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor',
											reporter: {
												photoUrl: userPhoto,
												name: 'Martin Friman Programmer',
												citeUrl:
													'https://www.citeexample.com',
											},
										},
									]}
								/>
							}
						/>
					</section>
					<Button
						icon={faChevronUp}
						text=""
						classNameButton={styles.buttonUp}
						classNameText={styles.buttonUpText}
						onClick={() => {
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
					/>
				</div>
			</div>
		</main>
	);
}
