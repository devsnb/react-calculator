import Calculator from './components/Calculator'
import { CalculatorContextProvider } from './features/CalculatorContext'
import './App.css'

function App() {
	return (
		<>
			<CalculatorContextProvider>
				<Calculator />
			</CalculatorContextProvider>
		</>
	)
}

export default App
