/** @format */

import React from "react";
import { Select, Input } from "antd";

// Filter `option.label` match the user type `input`
const filterOption = (input, option) =>
	(option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const InputGroup = ({
	title,
	options,
	value,
	setValue,
	inputValue,
	setInputValue = "",
}) => {
	const onChange = (value) => {
		setValue(value);
	};
	const onInputChange = (e) => {
		if (setInputValue) {
			setInputValue(e.target.value);
		}
	};
	return (
		<div className="flex flex-col mt-4">
			<h2 className="mt-2 text-lg text-white text-center ">{title}</h2>
			<Select
				className="mt-2"
				showSearch
				style={{ width: 200, textAlign: "center" }}
				placeholder="Select a person"
				optionFilterProp="children"
				onChange={onChange}
				filterOption={filterOption}
				options={options}
				value={value}
			/>
			<Input
				className={`mt-2`}
				type="number"
				defaultValue="1"
				onChange={() => onInputChange(e)}
				value={inputValue}
				style={{ width: 200, textAlign: "center" }}
			/>
		</div>
	);
};

export default InputGroup;
