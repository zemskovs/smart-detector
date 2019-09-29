import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import { Menu } from "./menu";
import { ContentArea } from "./contentArea";
import { AddFrom } from "./addFrom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AddFromForm } from "./addFromForm";

export class ExpertPage extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<ContentArea>
				<AddFrom />
				<AddFromForm />
			</ContentArea>
		);
	}
}
