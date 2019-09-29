import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar } from "./navbar";
import { Menu } from "./menu";
import { Footer } from "./footer";

export const ContentArea = props => {
	return (
		<div className="page">
			<Navbar title="Личный кабинет" />
			<div className="page-content d-flex align-items-stretch">
				<Menu />

				<div className="content-inner active">
					<header className="page-header">
						<Container fluid>
							<h2 className="no-margin-bottom">{props.title || "Дашборд"}</h2>
						</Container>
					</header>
					{props.children}
					<Footer />
				</div>
			</div>
		</div>
	);
};
