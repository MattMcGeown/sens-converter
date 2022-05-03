import "./task_card.css";
import taskList from "../../TASK_DATA.json";

const TaskCard = ({ game }) => {
	const filterOptions = (options) => {
		return options.filter(
			(option) => option["game"].toLowerCase().indexOf(game.toLowerCase()) > -1
		);
	};

	return (
		<div className="card_wrap">
			{filterOptions(taskList).map((option) => (
				<div className="card">
					<img
						className="task_image"
						src={process.env.PUBLIC_URL + option.img}
						alt={option.altText}
					/>
					<div className="task_info">
						<h4 className="task_title">{option.taskTitle}</h4>
						<h5 className="task_creator">Created by: {option.creator}</h5>
						{option.taskDesc.map((desc) => (
							<p className="task_desc">{desc}</p>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default TaskCard;
