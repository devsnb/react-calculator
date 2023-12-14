import { useCalculatorValues } from '../features/CalculatorContext'
import './Button.css'

const getStyleName = name => {
	const className = {
		'=': 'equals',
		X: 'operation',
		'-': 'operation',
		'+': 'operation',
		'/': 'operation'
	}

	return className[name]
}

const Button = ({ value }) => {
	const {
		decimalInput,
		reset,
		numberInputHandler,
		selectOperation,
		calculateOutput,
		calculatePercentage,
		toggleSign
	} = useCalculatorValues()

	const handelBtnClick = () => {
		const results = {
			'.': () => decimalInput(value),
			C: reset,
			'/': () => selectOperation(value),
			X: () => selectOperation(value),
			'-': () => selectOperation(value),
			'+': () => selectOperation(value),
			'=': calculateOutput,
			'%': calculatePercentage,
			'+-': toggleSign
		}
		if (results[value]) {
			return results[value]()
		} else {
			return numberInputHandler(value)
		}
	}

	return (
		<button
			onClick={handelBtnClick}
			className={`button ${getStyleName(value)}`}
			type='button'
		>
			{value}
		</button>
	)
}

export default Button
