import { AutoTextSize } from 'auto-text-size'
import { useCalculatorValues } from '../features/CalculatorContext'
import './Screen.css'

const Screen = () => {
	const { calc } = useCalculatorValues()
	return (
		<div className='screen'>
			<AutoTextSize maxFontSizePx={50}>
				{calc.num ? calc.num : calc.res}
			</AutoTextSize>
		</div>
	)
}

export default Screen
