import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import { Menu } from "./menu";
import { ContentArea } from "./contentArea";

export class ExpertPage extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<ContentArea>
				<section className="dashboard-counts no-padding-bottom">
					<Container fluid>
						<Row className="row bg-white has-shadow"></Row>
					</Container>
				</section>
			</ContentArea>
		);
	}
}
