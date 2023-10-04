/** @format */

import { useState } from "react";
import "./App.css";
import InputGroup from "./components/InputGroup";

const options = [
	{
		value: 'USA',
		label : "US Dollar"
	},
	{
		value: "BTP",
		label: "British Pound"
	},
	{
		value: "AUD",
		label: "Austrilian Dollar"
	}
]

function App() {
	const [selectedBaseCurrency, setSelectedBaseCurrency] = useState({label:"US Dollar", value: "USA"});
	const [selectedExchangeCurrency, setSelectedExchangeCurrency] = useState({label: "Austrilian Dollar", value:"AUD"});
	const [baseOptions, setBaseOptions] = useState(options);
	const [exchangeOptions, setExchangeOptions] = useState(options);
	const [exchangeRate, setExchangeRate] = useState({
		USDEUR: 0.951115,
		USDGBP: 0.82308,
		USDCAD: 1.37452,
		USDPLN: 4.381627,
	});
	const [baseValue , setBaseValue] = useState(1);
	const [exchangeValue, setExchangeValue] = useState(2);

	

	return (
		<div className="text-2xl md:text-4xl flex flex-col items-center justify-center w-screen h-screen font-bold bg-sky-500">
			<h2 className="text-white">Currency Exchange Rate</h2>

			<div className="lg:mt-6 flex flex-col lg:flex-row lg:gap-20  ">
				<InputGroup
					title="Base Currency"
					options={baseOptions}
					value={selectedBaseCurrency}
					setValue={setSelectedBaseCurrency}
					inputValue={baseValue}
					setInputValue={setBaseValue}
				/>
				<InputGroup
					title="Exchange Currency"
					options={exchangeOptions}
					value={selectedExchangeCurrency}
					setValue={setSelectedExchangeCurrency}
					inputValue={exchangeValue}
				/>
			</div>
		</div>
	);
}

export default App;
