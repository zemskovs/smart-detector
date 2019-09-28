import * as React from "react";
import { Link } from "react-router-dom";

export const ToggleListItem = props => {
	let [extra, setExtra] = React.useState(false);

	let i = props.item;

	return (
		<li key={i.name}>
			<a
				href="#"
				aria-expanded={extra}
				onClick={e => {
					e.preventDefault();
					setExtra(!extra);
				}}
			>
				<i className={i.icon} />
				{i.name}
				{extra ? <div>-</div> : <div>+</div>}
			</a>
			{extra && (
				<ul className="list-unstyled collapse show">
					{i.items.map((sub, subIdx) => (
						<li key={subIdx}>
							<Link to={sub.ref}>{sub.name}</Link>
						</li>
					))}
				</ul>
			)}
		</li>
	);
};
