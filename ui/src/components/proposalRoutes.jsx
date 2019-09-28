import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ContentArea } from "./contentArea";
import { sendForm } from "../helpers/utils";
import { url } from "../helpers/constants";

const alertOptions = ["vk", "email", "telegram"];
const controlMembers = [
	"Иванова Галина Николаевна",
	"Петрова Валентина Витальевна"
];
const implementMembers = [
	"Петров Николай Андреевич",
	"Никифоров Владимир Витаельевич"
];

// interface Answer {
// 	type: alertOptions,
// 	timeStart: number
// 	timeImpem: number,
// 	controlMember: controlMember,
//  implementMembers: implementMembers
// 	information: string
// }

const methodProps = {
	method: "GET",
	mode: "cors",
	cache: "no-cache",
	credentials: "same-origin",
	headers: {
		"Content-Type": "application/json"
	},
	redirect: "follow",
	referrer: "no-referrer"
};

export const ProposalRoutes = props => {
	let [answer, setAnswer] = React.useState({ timeStart: 24 });

	React.useEffect(() => {
		let ignore = false;
		function fetchCategories() {
			return fetch(`${url}categories/all`, {
				...methodProps
			}).then(res => res.json());
		}
		function fetchControllers() {
			return fetch(`${url}controllers/all`, {
				...methodProps
			}).then(res => res.json());
		}
		function fetchExecutors() {
			return fetch(`${url}controllers/all`, {
				...methodProps
			}).then(res => res.json());
		}

		Promise.all([
			fetchCategories(),
			fetchControllers(),
			fetchExecutors()
		]).then(values => values.map(value => setAnswer({ ...answer, value })));

		return () => {
			ignore = true;
		};
	});
	console.log(answer);
	return (
		<ContentArea>
			<section className="dashboard-counts">
				<Container fluid>
					<Row className="row bg-white has-shadow">
						<Form className="w-100">
							<Form.Group as={Row}>
								<Form.Label column>Тип оповещения</Form.Label>
								<Col>
									<Form.Control
										as="select"
										onChange={e =>
											setAnswer({
												...answer,
												type: e.target.value
											})
										}
									>
										{alertOptions.map(x => (
											<option key={x}>{x}</option>
										))}
									</Form.Control>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column>
									Срок приянтия в работу (ч)
								</Form.Label>
								<Col>
									<Form.Control
										type="number"
										onInput={e =>
											setAnswer({
												...answer,
												timeStart: e.target.value
											})
										}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column>
									Срок исполнения (ч)
								</Form.Label>
								<Col>
									<Form.Control
										type="number"
										onInput={e =>
											setAnswer({
												...answer,
												timeImplement: e.target.value
											})
										}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column>Контролер</Form.Label>
								<Col>
									<Form.Control
										as="select"
										onChange={e =>
											setAnswer({
												...answer,
												controlMember: e.target.value
											})
										}
									>
										{controlMembers.map(x => (
											<option key={x}>{x}</option>
										))}
									</Form.Control>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column>Исполнители</Form.Label>
								<Col>
									<Form.Control
										as="select"
										onChange={e =>
											setAnswer({
												...answer,
												implementMember: e.target.value
											})
										}
									>
										{implementMembers.map(x => (
											<option key={x}>{x}</option>
										))}
									</Form.Control>
								</Col>
							</Form.Group>

							<Button
								variant="primary"
								onClick={() => {
									console.log(answer);
									sendForm("routes/new", answer, res =>
										console.log(res)
									);
								}}
							>
								Отправить
							</Button>
						</Form>
					</Row>
				</Container>
			</section>
		</ContentArea>
	);
};
