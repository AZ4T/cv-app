import styles from './Skills.module.scss';
import Button from '../Button/Button';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import type { RootState } from '../../app/types';
import { useState } from 'react';
import { addSkill, type SkillItem } from '../../features/skills/skillsSlice';

const SkillSchema = Yup.object().shape({
	name: Yup.string().required('Skill name is a required field'),
	range: Yup.number()
		.typeError("Skill range must be a 'number' type")
		.required('Skill range is a required field')
		.min(10, 'Skill range must be greater than or equal to 10')
		.max(100, 'Skill range must be less than or equal to 100'),
});

export default function Skills() {
	const dispatch = useDispatch<AppDispatch>();

	const skills = useSelector((state: RootState) => state.skills.items);
	const status = useSelector((state: RootState) => state.skills.status);
	const error = useSelector((state: RootState) => state.skills.errorMessage);

	const [isEditing, setIsEditing] = useState(false);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<h2 className={styles.heading}>Skills</h2>
				<Button
					classNameButton={styles.toggleButton}
					text={isEditing ? 'Cancel' : 'Open Edit'}
					icon={faPenToSquare}
					onClick={() => setIsEditing((prev) => !prev)}
				/>
			</div>

			{status === 'loading' && (
				<div className={styles.infoText}>Loading skills…</div>
			)}
			{status === 'failed' && (
				<div className={styles.errorText}>
					Error loading skills: {error}
				</div>
			)}

			<div className={styles.skillList}>
				{skills.map((skill: SkillItem) => (
					<div key={skill.id} className={styles.skillBarContainer}>
						<div className={styles.skillLabel}>{skill.name}</div>
						<div className={styles.skillBarBackground}>
							<div
								className={styles.skillBarFill}
								style={{ width: `${skill.range}%` }}
							/>
						</div>
						<div className={styles.skillPercent}>
							{skill.range}%
						</div>
					</div>
				))}
				{skills.length === 0 && (
					<div className={styles.infoText}>No skills added yet.</div>
				)}
			</div>

			{isEditing && (
				<div className={styles.formWrapper}>
					<Formik
						initialValues={{ name: '', range: '' as number | '' }}
						validationSchema={SkillSchema}
						onSubmit={(values, { resetForm }) => {
							// Create a new skill object
							const newSkill: SkillItem = {
								id: Date.now().toString(), // simple unique ID
								name: values.name.trim(),
								range: Number(values.range),
							};
							dispatch(addSkill(newSkill));
							resetForm(); // clear form fields
							setIsEditing(false); // close the form
						}}
					>
						{({ isValid, dirty }) => (
							<Form className={styles.form}>
								<div className={styles.formRow}>
									<label htmlFor="name">Skill Name</label>
									<Field
										id="name"
										name="name"
										type="text"
										placeholder="e.g. JavaScript"
									/>
									<ErrorMessage
										name="name"
										component="div"
										className={styles.errorMessage}
									/>
								</div>

								<div className={styles.formRow}>
									<label htmlFor="range">
										Skill Range (10–100)
									</label>
									<Field
										id="range"
										name="range"
										type="number"
										placeholder="Enter a number between 10 and 100"
									/>
									<ErrorMessage
										name="range"
										component="div"
										className={styles.errorMessage}
									/>
								</div>

								<button
									type="submit"
									className={styles.submitButton}
									disabled={!(isValid && dirty)}
								>
									Add skill
								</button>
							</Form>
						)}
					</Formik>
				</div>
			)}
		</div>
	);
}
