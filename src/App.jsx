/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import InputGroup from "./components/InputGroup";



function App() {
	const [selectedBaseCurrency, setSelectedBaseCurrency] = useState("");
	const [selectedExchangeCurrency, setSelectedExchangeCurrency] = useState(null);
	const [baseOptions, setBaseOptions] = useState([]);
	const [exchangeOptions, setExchangeOptions] = useState([]);
	const [exchangeRate, setExchangeRate] = useState({});
	const [baseValue, setBaseValue] = useState(1);
	const [exchangeValue, setExchangeValue] = useState(0);
	const [countryCode , setCountryCode] = useState({});

	const fetchCurrencyList = async () => {
		try {
			const res = await axios.get(
				`http://apilayer.net/api/list?access_key=08ca0d52bd88cdf5c93a70df1ef71082`
			);
			if (res.status === 200) {
				const currencyCodeArray = res.data
					? Object.keys(res?.data?.currencies)
					: [];
				const options = currencyCodeArray.map((item) => ({
					label: item,
					value: item,
				}));
				
				setBaseOptions([...options]);
				setSelectedBaseCurrency("USD");
				setCountryCode(res.data.currencies);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const fetchExchangeRate = async (source) => {
		try {
			const res = await axios.get(
				`http://apilayer.net/api/live?access_key=08ca0d52bd88cdf5c93a70df1ef71082&source=${source}`
			);
			if (res.status === 200) {
				const exchangeRate = res.data.quotes;
				const exchangeCurrencyArr = Object.keys(exchangeRate);

				const options = exchangeCurrencyArr.map((item) => ({
					label: item.slice(-3),
					value: item,
				}));
				setExchangeOptions(options);
				setExchangeRate(exchangeRate);
			    setSelectedExchangeCurrency(options[0].value);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchCurrencyList();
	}, []);

	useEffect(() => {
		if(selectedBaseCurrency) {
			fetchExchangeRate(selectedBaseCurrency);
		}
	}, [selectedBaseCurrency]);


	useEffect(() => {
		if (baseValue || selectedBaseCurrency || selectedExchangeCurrency) {
			setExchangeValue((baseValue * exchangeRate[selectedExchangeCurrency]).toFixed(4));
		}
	}, [baseValue, selectedBaseCurrency, selectedExchangeCurrency]);

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
					countryCode={countryCode}
				/>
				<InputGroup
					title="Exchange Currency"
					options={exchangeOptions}
					value={selectedExchangeCurrency}
					setValue={setSelectedExchangeCurrency}
					inputValue={exchangeValue}
					countryCode={countryCode}
				/>
			</div>
		</div>
	);
}

export default App;
