import * as React from "react";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

export const Footer = props => {
	return (
		<footer className="main-footer">
			<Container fluid>
				<Row>
					<Col md={12}>ЦуП</Col>
				</Row>
			</Container>
		</footer>
	);
};
