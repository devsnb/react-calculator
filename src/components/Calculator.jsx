import Screen from './Screen'
import ButtonBox from './ButtonBox'

import './Calculator.css'
import Button from './Button'

const buttonValues = [
	['C', '+-', '%', '/'],
	[7, 8, 9, 'X'],
	[4, 5, 6, '-'],
	[1, 2, 3, '+'],
	[0, '.', '=']
]

const Calculator = () => {
	return (
		<div className='calculator-wrapper'>
			<Screen />
			<ButtonBox>
				{buttonValues.flat().map((btn, idx) => (
					<Button value={btn} key={idx} />
				))}
			</ButtonBox>
		</div>
	)
}

export default Calculator
