import * as React from "react";
import { ContentArea } from "./contentArea";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { AllCategory } from "./allCategory";

export const CreateCategoryPage = props => {
	return (
		<ContentArea title="Категории">
			<section className="dashboard-counts">
				<Container fluid>
					<Row>
						<Col lg={6} md={12}>
							<div className="card pt-0">
								<div className="card-header">
									<h3>Создать категорию</h3>
								</div>
								<div className="card-body">
									<Form className="w-100">
										<Form.Group as={Row}>
											<Form.Label column>
												Категории
											</Form.Label>
											<Col>
												<Form.Control type="text"></Form.Control>
											</Col>
										</Form.Group>
										<Form.Group as={Row}>
											<Form.Label column>
												Наименование
											</Form.Label>
											<Col>
												<Form.Control type="text"></Form.Control>
											</Col>
										</Form.Group>
										<Form.Group as={Row}>
											<Form.Label column>
												Маршрут
											</Form.Label>
											<Col>
												<Form.Control type="text"></Form.Control>
											</Col>
										</Form.Group>
										<Form.Group as={Row}>
											<Form.Label column>
												Приоритет
											</Form.Label>
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
										<Form.Group as={Row}>
											<Button
												variant="primary"
												onClick={() => {
													console.log(answer);
												}}
											>
												Добавить
											</Button>
										</Form.Group>
									</Form>
								</div>
							</div>
						</Col>
						<Col lg={6} md={12}>
							<AllCategory />
						</Col>
					</Row>
				</Container>
			</section>
		</ContentArea>
	);
};
