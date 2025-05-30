import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Button.module.scss';

type ButtonProps = {
	icon?: IconDefinition;
	text: string;
	classNameButton?: string;
	classNameText?: string;
	onClick?: () => void;
};

export default function Button({
	icon,
	text,
	classNameButton = '',
	classNameText = '',
	onClick,
}: ButtonProps) {
	return (
		<button className={`${styles.button} ${classNameButton}`} onClick={onClick}>
			{icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
			<span className={`${styles.text} ${classNameText}`}>{text}</span>
		</button>
	);
}
