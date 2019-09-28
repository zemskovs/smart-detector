import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ContentArea } from "./contentArea";
import { sendForm, findId } from "../helpers/utils";
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
	let [formAnswer, setFormAnswer] = React.useState({
		notificationType: "email"
	});

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
			return fetch(`${url}executors/all`, {
				...methodProps
			}).then(res => res.json());
		}

		const answerStructure = {
			0: "categories",
			1: "controllers",
			2: "executor"
		};

		function all() {
			return Promise.all([
				fetchCategories(),
				fetchControllers(),
				fetchExecutors()
			]).then(values => {
				const result = values.reduce(
					(acc, value, idx) => {
						acc[answerStructure[idx]] = value;
						return acc;
					},
					{ answer }
				);

				if (!ignore) return setAnswer(result);
			});
		}
		all();
		return () => {
			ignore = true;
		};
	}, []);

	return (
		<ContentArea>
			<section className="dashboard-counts">
				<Container fluid>
					<Row className="row bg-white has-shadow">
						<Form className="w-100">
							<Form.Group as={Row}>
								<Form.Label column>
									Название маршрута
								</Form.Label>
								<Col>
									<Form.Control
										type="text"
										onInput={e =>
											setFormAnswer({
												...formAnswer,
												name: e.target.value
											})
										}
									/>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column>Тип оповещения</Form.Label>
								<Col>
									<Form.Control as="select">
										<option>email</option>
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
											setFormAnswer({
												...formAnswer,
												assignTimeRequired: parseInt(
													e.target.value
												)
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
											setFormAnswer({
												...formAnswer,
												executionTimeRequired:
													e.target.value != "" &&
													parseInt(e.target.value)
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
										onChange={e => {
											setFormAnswer({
												...formAnswer,
												controllerId: findId(
													answer.controllers,
													e.target.value
												)
											});
										}}
									>
										{answer.controllers &&
											answer.controllers.map(k => (
												<option key={k.id}>
													{` ${k.surname} ${k.name} ${k.middleName}`}
												</option>
											))}
									</Form.Control>
								</Col>
							</Form.Group>

							<Form.Group as={Row}>
								<Form.Label column>Исполнители</Form.Label>
								<Col>
									<Form.Control
										as="select"
										onChange={e => {
											setFormAnswer({
												...formAnswer,
												executorId: findId(
													answer.executor,
													e.target.value
												)
											});
										}}
									>
										{answer.executor &&
											answer.executor.map(k => (
												<option key={k.id}>
													{`${k.surname} ${k.name} ${k.middleName}`}
												</option>
											))}
									</Form.Control>
								</Col>
							</Form.Group>

							<Button
								variant="primary"
								onClick={() => {
									debugger;
									console.log(formAnswer);
									sendForm("routes/new", formAnswer, res =>
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
