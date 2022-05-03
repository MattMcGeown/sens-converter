// React Imports
import { useEffect, useState } from "react";

// Component Imports
import Navbar from "./components/Navbar/Navbar";
import InputText from "./components/InputText/InputText";
import InputNum from "./components/InputNum/InputNum";
import TaskCard from "./components/TaskCard/TaskCard";

// Data Import
import GAME_DATA from "./GAME_DATA.json";

// Icon Imports
import AutorenewIcon from "@mui/icons-material/Autorenew";

// CSS Import
import "./app.css";

function App() {
	const [fromOption, setFromOption] = useState(GAME_DATA[0]);
	const [fromInputValue, setFromInputValue] = useState(1);

	const [toOption, setToOption] = useState(GAME_DATA[1]);
	const [toInputValue, setToInputValue] = useState(1);

	const [inputCPI, setInputCPI] = useState(800);
	const [cm360, setCM360] = useState(0);

	const [switchData, setSwitchData] = useState(false);

	// Convert toInputValue to a string in order to limit the number of decimals without rounding
	useEffect(() => {
		const calcToInputValue =
			(fromInputValue / fromOption.ratio) * toOption.ratio;

		if (!isNaN(calcToInputValue)) {
			const valueMatch = calcToInputValue
				.toString()
				.match(/^-?\d+(?:\.\d{0,5})?/)[0];
			setToInputValue(valueMatch);
		}
	}, [fromOption, toOption, fromInputValue]);

	// Convert inputCPI to a string in order to limit the number of decimals without rounding
	useEffect(() => {
		const cpiCalc = fromOption.dpiRatio / inputCPI / fromInputValue;

		if (!isNaN(cpiCalc)) {
			const valueMatch = cpiCalc.toString().match(/^-?\d+(?:\.\d{0,5})?/)[0];
			setCM360(valueMatch);
		}
	}, [inputCPI, fromOption, fromInputValue]);

	// Handle switching data between fields
	const handleSwitchData = () => {
		setSwitchData(!switchData);
		setFromOption(toOption);
		setToOption(fromOption);
	};

	return (
		<div className="app">
			<Navbar />
			<div className="input_wrap">
				<div className="game_select">
					<InputText
						inputLabel={"From Game"}
						toolTipTitle={"Select the game you want to convert from"}
						optionList={GAME_DATA}
						keyLabel={"name"}
						inputValue={fromOption}
						onChangeOption={(option) => setFromOption(option)}
					/>
					<InputText
						inputLabel={"To Game"}
						toolTipTitle={"Select the game you want to convert to"}
						optionList={GAME_DATA}
						keyLabel={"name"}
						inputValue={toOption}
						onChangeOption={(option) => setToOption(option)}
					/>
				</div>
				<AutorenewIcon
					className="switch_icon"
					onClick={() => handleSwitchData(true)}
				/>
				<div className="sens_input">
					<InputNum
						inputLabel={"Sensitivity"}
						toolTipTitle={"Enter your sensitivity"}
						numInputValue={fromInputValue}
						onChangeInput={(e) => setFromInputValue(e.target.value)}
						readOnly={false}
						canCopy={false}
					/>
					<InputNum
						inputLabel={"Sensitivity"}
						toolTipTitle={"Converted sensitivity"}
						numInputValue={toInputValue}
						onChangeInput={(e) => setToInputValue(e.target.value)}
						readOnly={true}
						canCopy={true}
					/>
				</div>
				<div className="dpi_calc_wrap">
					<h2>Advanced Options</h2>
					<div className="dpi_calc_input">
						<InputNum
							inputLabel={"Enter your CPI"}
							toolTipTitle={"Enter your CPI / DPI"}
							numInputValue={inputCPI}
							onChangeInput={(e) => setInputCPI(e.target.value)}
							readOnly={false}
							canCopy={false}
						/>
						<InputNum
							inputLabel={"CM/360°"}
							toolTipTitle={"How many CM for a 360° turn"}
							numInputValue={cm360}
							onChangeInput={null}
							readOnly={true}
							canCopy={false}
						/>
					</div>
				</div>
			</div>
			<TaskCard game={toOption.name} />
		</div>
	);
}

export default App;
