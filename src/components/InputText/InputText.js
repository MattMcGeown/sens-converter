// Icon Imports
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InfoIcon from "@mui/icons-material/Info";

// React Imports
import { useEffect, useRef, useState } from "react";

// Unique ID for list items
import { v4 as uuidv4 } from "uuid";

// Component Imports
import SensTooltip from "../SensTooltip/SensTooltip";

// CSS Import
import "./input_text.css";

const InputText = ({
	inputLabel,
	optionList,
	keyLabel,
	inputValue,
	onChangeOption,
	toolTipTitle,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const ref = useRef();

	// Close the dropdown when the user clicks outside of it
	useEffect(() => {
		const checkIfClickedOutside = (e) => {
			if (isOpen && ref.current && !ref.current.contains(e.target)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("click", checkIfClickedOutside);
		return () => {
			document.addEventListener("click", checkIfClickedOutside);
		};
	}, [isOpen]);

	// Filter options map by search term (can be keyword or name)
	const filterOptions = (options) => {
		for (let i = 0; i < options.length; i++) {
			return options.filter(
				(option) =>
					option[keyLabel].toLowerCase().indexOf(searchTerm.toLowerCase()) >
						-1 ||
					option.keywords[i].toLowerCase().indexOf(searchTerm.toLowerCase()) >
						-1
			);
		}
	};

	// Select which value to display in the input
	const displayValue = () => {
		optionList.map((option) => {
			if (
				searchTerm.length > 0 &&
				searchTerm.toLowerCase !== option[keyLabel].toLowerCase()
			) {
				setSearchTerm("");
			}
			return inputValue[keyLabel];
		});
		if (inputValue) return inputValue[keyLabel];
		return "";
	};

	// Handle option being selected
	const handleOptionSelect = (option) => {
		setSearchTerm("");
		setIsOpen(!isOpen);
		onChangeOption(option);
	};

	return (
		<div className="option_input_text_wrap">
			<label className="info_label">
				{inputLabel}
				<SensTooltip
					title={toolTipTitle}
					placement="top"
					aria-label={toolTipTitle}>
					<InfoIcon className="info_icon" />
				</SensTooltip>
			</label>
			<div className="option_select" onClick={() => setIsOpen(!isOpen)}>
				<input
					type="text"
					className={`option_input ${isOpen ? "open" : ""}`}
					ref={ref}
					value={isOpen ? searchTerm : displayValue()}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<span className={`dropdown_caret ${isOpen ? "open" : ""}`}>
					<KeyboardArrowDownIcon />
				</span>
			</div>
			<ul className={`option_list ${isOpen ? "open" : ""}`}>
				{filterOptions(optionList).map((option) => (
					<li
						className={`option_list_item`}
						key={uuidv4()}
						onClick={() => handleOptionSelect(option)}>
						{option[keyLabel]}
					</li>
				))}
			</ul>
		</div>
	);
};

export default InputText;
