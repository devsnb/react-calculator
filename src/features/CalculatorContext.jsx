import { createContext, useContext, useState } from 'react'

const CalculatorContext = createContext(null)

export const useCalculatorValues = () => {
	const { calc, setCalc } = useContext(CalculatorContext)
	return { calc, setCalc }
}

export const CalculatorContextProvider = ({ children }) => {
	const [calc, setCalc] = useState({
		sign: '',
		num: 0,
		res: 0
	})

	return (
		<CalculatorContext.Provider value={{ calc, setCalc }}>
			{children}
		</CalculatorContext.Provider>
	)
}
