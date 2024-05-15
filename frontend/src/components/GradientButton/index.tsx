import styles from './gradButton.module.scss'; // Import your CSS module

const CustomButton = ({ text, onClick }) => {
    return (
        <div className={styles["button-body"]}>
            <button className={styles["app_button"]} onClick={onClick}>
                {text}
            </button>
            <p className={styles["button-text"]} onClick={onClick}>{text}</p>
        </div>
    );
};

export default CustomButton;