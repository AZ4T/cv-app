import styles from './Info.module.scss';

type InfoProps = {
	text: string;
};

export default function Info({ text }: InfoProps) {
    return(
        <div className={styles.wrapper}>
            <p className={styles.text}>{text}</p>
        </div>
    )
}
