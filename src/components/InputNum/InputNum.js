import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import InfoIcon from "@mui/icons-material/Info";
import SensTooltip from "../SensTooltip/SensTooltip";
import "./input_num.css";
import { useEffect, useState } from "react";

const InputNum = ({
	inputLabel,
	onChangeInput,
	numInputValue,
	readOnly,
	canCopy,
	toolTipTitle,
}) => {
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		setIsCopied(false);
	}, [numInputValue]);

	return (
		<div className="option_input_num_wrap">
			<label className="info_label">
				{inputLabel}
				<SensTooltip
					title={toolTipTitle}
					placement="top"
					aria-label={toolTipTitle}>
					<InfoIcon className="info_icon" />
				</SensTooltip>
			</label>
			<div className="input_num_field">
				<input
					type="number"
					className={`num_input ${readOnly ? "readonly" : ""}`}
					value={numInputValue}
					onClick={(e) => (readOnly ? null : e.target.select())}
					onChange={onChangeInput}
					readOnly={readOnly}
					canCopy={canCopy}
				/>
				{canCopy && (
					<CopyToClipboard text={numInputValue}>
						<SensTooltip
							title={isCopied ? "Copied!" : "Copy"}
							placement="top"
							aria-label="Copy Sensitivity">
							<span className="copy_icon" onClick={() => setIsCopied(true)}>
								<ContentCopyIcon />
							</span>
						</SensTooltip>
					</CopyToClipboard>
				)}
			</div>
		</div>
	);
};

export default InputNum;
