import * as React from "react";
import Row from "react-bootstrap/Row";

export const ProposalStatus = props => {
	return (
		<Row className="row bg-white has-shadow">
			<div className="left-col col-lg-6 d-flex align-items-center justify-content-between">
				<div className="project-title d-flex align-items-center">
					<div className="image has-shadow"></div>
					<div className="text">
						<h3 className="h4">{props.status}</h3>
						{props.description && (
							<small>{props.description}</small>
						)}
					</div>
				</div>
				<div className="project-date">
					<span className="hidden-sm-down">{props.date}</span>
				</div>
			</div>
		</Row>
	);
};

export const ProposalStatusControl = props => {
	return props.items.map((s, idx) => (
		<ProposalStatus
			key={idx}
			status={s.status}
			description={s.description}
			date={s.date}
		/>
	));
};
