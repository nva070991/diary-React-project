import styles from './Header.module.css'

function Header() {

	return (
		<div className={styles.boxLogo}>
			<img className={styles.logo} src="/logo.svg" alt="Journal's logo" /> 
			<p>Personal Journal</p>
		</div>
		
	)
}

export default Header;
