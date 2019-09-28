import * as React from "react";
import { ContentArea } from "./contentArea";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const CreateCategoryPage = props => {
	return (
		<ContentArea>
			<section className="dashboard-counts">
				<Container fluid>
					<Row className="bg-white has-shadow">
						<Form className="w-100">
							<Form.Group as={Row}>
								<Form.Label column>Категории</Form.Label>
								<Col>
									<Form.Control type="text"></Form.Control>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column>Наименование</Form.Label>
								<Col>
									<Form.Control type="text"></Form.Control>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column>Маршрут</Form.Label>
								<Col>
									<Form.Control type="text"></Form.Control>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column>Приоритет</Form.Label>
								<Col>
									<Form.Control as="text"></Form.Control>
								</Col>
							</Form.Group>
							<Form.Group as={Row}>
								<Form.Label column>
									Информация об аварии
								</Form.Label>
								<Col>
									<Form.Control as="text"></Form.Control>
								</Col>
							</Form.Group>
							<Button
								variant="primary"
								onClick={() => {
									console.log(answer);
								}}
							>
								Добавить
							</Button>
						</Form>
					</Row>
				</Container>
			</section>
		</ContentArea>
	);
};
