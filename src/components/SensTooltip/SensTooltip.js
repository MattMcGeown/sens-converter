import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

const SensTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: "#222",
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "#222",
		fontSize: "0.8rem",
	},
}));

export default SensTooltip;
