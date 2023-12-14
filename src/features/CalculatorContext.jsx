import { createContext, useContext, useState } from 'react'

const CalculatorContext = createContext(null)

export const useCalculatorValues = () => {
	const {
		calc,
		setCalc,
		decimalInput,
		reset,
		numberInputHandler,
		selectOperation,
		calculateOutput,
		calculatePercentage,
		toggleSign
	} = useContext(CalculatorContext)
	return {
		calc,
		setCalc,
		decimalInput,
		reset,
		numberInputHandler,
		selectOperation,
		calculateOutput,
		calculatePercentage,
		toggleSign
	}
}

export const CalculatorContextProvider = ({ children }) => {
	const [calc, setCalc] = useState({
		sign: '',
		num: 0,
		res: 0
	})

	// when a decimal is entered
	const decimalInput = value => {
		setCalc(prevCalc => {
			return {
				...prevCalc,
				num: !prevCalc.num.toString().includes('.')
					? prevCalc.num + value
					: prevCalc.num
			}
		})
	}

	// reset calculator
	const reset = () => {
		setCalc({ sign: '', num: 0, res: 0 })
	}

	// handles number input
	const numberInputHandler = value => {
		const numberString = value.toString()

		let numberValue
		if (numberString === '0' && calc.num === 0) {
			numberValue = '0'
		} else {
			numberValue = Number(calc.num + numberString)
		}

		setCalc(prevCalc => {
			return {
				...prevCalc,
				num: numberValue
			}
		})
	}

	// operation select handler
	const selectOperation = value => {
		setCalc(prevCalc => {
			return {
				sign: value,
				res: !prevCalc.res && prevCalc.num ? prevCalc.num : prevCalc.res,
				num: 0
			}
		})
	}

	const calculateOutput = () => {
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
			setCalc(prevCalc => {
				return {
					res: math(prevCalc.res, prevCalc.num, prevCalc.sign),
					sign: '',
					num: 0
				}
			})
		}
	}

	const calculatePercentage = () => {
		setCalc(prevCalc => {
			return {
				num: prevCalc.num / 100,
				res: prevCalc.res / 100,
				sign: ''
			}
		})
	}

	const toggleSign = () => {
		setCalc(prevCalc => {
			return {
				num: prevCalc.num ? prevCalc.num * -1 : 0,
				res: prevCalc.res ? prevCalc.res * -1 : 0,
				sign: ''
			}
		})
	}

	return (
		<CalculatorContext.Provider
			value={{
				calc,
				setCalc,
				decimalInput,
				reset,
				numberInputHandler,
				selectOperation,
				calculateOutput,
				calculatePercentage,
				toggleSign
			}}
		>
			{children}
		</CalculatorContext.Provider>
	)
}
