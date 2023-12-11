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
	const { calc, setCalc } = useCalculatorValues()

	// User click comma/period
	const commaClick = () => {
		setCalc({
			...calc,
			num: !calc.num.toString().includes('.') ? calc.num + value : calc.num
		})
	}
	// User click C
	const resetClick = () => {
		setCalc({ sign: '', num: 0, res: 0 })
	}
	// User click number
	const handleClickButton = () => {
		const numberString = value.toString()

		let numberValue
		if (numberString === '0' && calc.num === 0) {
			numberValue = '0'
		} else {
			numberValue = Number(calc.num + numberString)
		}

		setCalc({
			...calc,
			num: numberValue
		})
	}
	// User click operation
	const signClick = () => {
		setCalc({
			sign: value,
			res: !calc.res && calc.num ? calc.num : calc.res,
			num: 0
		})
	}
	// User click equals
	const equalsClick = () => {
		if (calc.res && calc.num) {
			const math = (a, b, sign) => {
				const result = {
					'+': (a, b) => a + b,
					'-': (a, b) => a - b,
					X: (a, b) => a * b,
					'/': (a, b) => a / b
				}
				return result[sign](a, b)
			}
			setCalc({
				res: math(calc.res, calc.num, calc.sign),
				sign: '',
				num: 0
			})
		}
	}
	// User click percent
	const percentClick = () => {
		setCalc({
			num: calc.num / 100,
			res: calc.res / 100,
			sign: ''
		})
	}
	// User click invert button
	const invertClick = () => {
		setCalc({
			num: calc.num ? calc.num * -1 : 0,
			res: calc.res ? calc.res * -1 : 0,
			sign: ''
		})
	}

	const handelBtnClick = () => {
		const results = {
			'.': commaClick,
			C: resetClick,
			'/': signClick,
			X: signClick,
			'-': signClick,
			'+': signClick,
			'=': equalsClick,
			'%': percentClick,
			'+-': invertClick
		}
		if (results[value]) {
			return results[value]()
		} else {
			return handleClickButton()
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
