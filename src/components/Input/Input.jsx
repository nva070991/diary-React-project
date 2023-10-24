import styles from './Input.module.css'
import cn from 'classnames'
import {forwardRef} from 'react'

const Input = forwardRef(function Input({className, isValid, appearance, ...props }, ref) {

	return (
		<input {...props} ref={ref} className={cn(className, styles['journal-form-input'],
			{[styles.invalid] : !isValid,
				[styles['journal-form-title']]:appearance === 'title'
			})} />

		
	)
})

export default Input;
