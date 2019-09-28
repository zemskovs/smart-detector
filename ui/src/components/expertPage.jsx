import * as React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navbar } from "./navbar";
import { Link } from "react-router-dom";
import { Menu } from "./menu";
import { ContentArea } from "./contentArea";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export class ExpertPage extends React.Component {
	componentDidMount() {}

	render() {
		return (
			<ContentArea>
				<section className="dashboard-counts no-padding-bottom">
					<Container fluid>
						<Row className="row bg-white has-shadow">
							{/* <Form className="w-100">
								<Form.Group controlId="exampleForm.ControlInput1">
									<Form.Label>Email</Form.Label>
									<Form.Control
										type="email"
										placeholder="name@example.com"
										onInput={e => setName(e.target.value)}
									/>
								</Form.Group>

								<Form.Group controlId="exampleForm.ControlTextarea1">
									<Form.Label>Жалоба</Form.Label>
									<Form.Control
										as="textarea"
										rows="3"
										onInput={e => setText(e.target.value)}
									/>
								</Form.Group>
								<Button variant="primary" onClick={sendForm}>
									Отправить
								</Button>
							</Form> */}
						</Row>
					</Container>
				</section>
			</ContentArea>
		);
	}
}
