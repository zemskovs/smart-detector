import * as React from "react";
import { Link } from "react-router-dom";

export const RecentCard = props => (
	<div className="recent-updates card">
		<div className="card-header">
			<h3 className="h4">Доступные заявки</h3>
		</div>
		<div className="card-body no-padding">
			{props.answer.map(p => (
				<div key={p.id} className="item d-flex justify-content-between">
					<div className="info d-flex">
						<div className="icon">
							<i className="icon-rss-feed"></i>
						</div>
						<div className="title">
							<Link to={`card/${p.id}`}><h5>Заявка {p.id}.</h5></Link>
							<p>{p.text}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	</div>
);
