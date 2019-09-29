import * as React from "react";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export const ProposalAnswer = props => {
	return (
		<Row className="bg-white has-shadow">
			<Col md={12}>
				<Form className="w-100">
					<Form.Group>
						<Form.Label column>Описание</Form.Label>
						<Form.Control as="textarea" readOnly value={props.text} rows={4} />
					</Form.Group>
					{/* <Form.Group>
						<Form.Label column>Ответ</Form.Label>
						<Form.Control as="textarea" rows={3} />
					</Form.Group> */}
				</Form>
			</Col>
		</Row>
	);
};
