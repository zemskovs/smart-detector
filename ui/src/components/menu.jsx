import * as React from "react";
import { Link } from "react-router-dom";

const menuItems = [
	{
		icon: "icon-padnote",
		name: "Заявки",
		ref: "/",
		items: [
			{
				name: "Новые",
				ref: "/new"
			},
			{
				name: "На контроле",
				ref: "/control"
			}
		]
	}
];

export const Menu = props => {
	return (
		<nav className="side-navbar shrinked">
			<div className="sidebar-header d-flex align-items-center">
				<h3 style={{ margin: "auto" }}>ЗВ</h3>
			</div>
			<span className="heading">Меню</span>
			<ul className="list-unstyled">
				{menuItems.map((i, idx) =>
					i.items ? (
						<li key={i.name}>
							<a
								href={`#${idx}exampledropdownDropdown`}
								aria-expanded="true"
								data-toggle="collapse"
							>
								{i.name}
							</a>
							<ul
								id={`${idx}exampledropdownDropdown`}
								className="list-unstyled collapse show"
							>
								{i.items.map((sub, subIdx) => (
									<li key={`${idx}-${subIdx}`}>
										<Link to={sub.ref}>{sub.name}</Link>
									</li>
								))}
							</ul>
						</li>
					) : (
						<li key={idx}>
							<Link to={i.ref}>
								<i className={i.icon} />
								{i.name}
							</Link>
						</li>
					)
				)}
			</ul>
		</nav>
	);
};
