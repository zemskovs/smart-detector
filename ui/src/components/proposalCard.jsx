import * as React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { ContentArea } from "./contentArea";
import { ProposalStatusControl } from "./proposalStatus";
import { ProposalAnswer } from "./proposalAnswer";
import { useParams } from "react-router-dom";
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

const statuses = [
	{
		status: "Заявка зарегистрирована",
		date: "29.08.2018",
		type: "reg"
	},
	{
		status: "Назначен исполнитель",
		description: "Иванов А.А.",
		date: "30.08.2018",
		type: "reg"
	}
];

export const ProposalCard = props => {
	let { id } = useParams();
	let [answer, setAnswer] = React.useState();
	const requestResultRef = React.useRef();

	React.useEffect(() => {
		fetch(`${url}analyze`, {
			method: "POST",
			mode: "cors",
			cache: "no-cache",
			credentials: "same-origin",
			headers: {
				"Content-Type": "application/json"
			},
			redirect: "follow",
			referrer: "no-referrer",

			body: JSON.stringify(id)
		})
			.then(res => res.json())
			.then(answer => (requestResultRef.current = answer));
	});

	const proposal = requestResultRef.current;

	let proposalID = id;
	console.log(proposal);
	const date = 'date';
	// const { date, statuses, implementMembers } = proposal;

	return (
		<ContentArea>
			<section className="dashboard-counts">
				<Container fluid>
					<Row>
						<Col md={12}>
							<h3>Заявка {proposalID}</h3>{" "}
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<Row className="bg-white has-shadow">
								<Form className="w-100">
									<Form.Group as={Row}>
										<Form.Label column>
											Категории
										</Form.Label>
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
											Дата регистрации
										</Form.Label>
										<Col>
											<Form.Control
												type="text"
												readOnly
												value={date}
												onInput={e =>
													setAnswer({
														...answer,
														timeStart:
															e.target.value
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
														timeImplement:
															e.target.value
													})
												}
											/>
										</Col>
									</Form.Group>
									<Form.Group as={Row}>
										<Form.Label column>
											Исполнитель
										</Form.Label>
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
												{controlMembers.map(x => (
													<option key={x}>{x}</option>
												))}
											</Form.Control>
										</Col>
									</Form.Group>
									<Form.Group as={Row}>
										<Form.Label column>Адрес</Form.Label>
										<Col>
											<Form.Control
												type="text"
												onInput={e =>
													setAnswer({
														...answer,
														timeImplement:
															e.target.value
													})
												}
											/>
										</Col>
									</Form.Group>
								</Form>
							</Row>
						</Col>

						<Col md={6}>
							<ProposalStatusControl items={statuses} />
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<ProposalAnswer />
						</Col>
					</Row>
					<Row>
						<Col md={12}>
							<Row>
								<div style={{ paddingRight: "3em" }}>
									<Button
										variant="primary"
										onClick={() => {
											console.log(answer);
										}}
									>
										Взять в работу
									</Button>
								</div>
								<Button
									variant="primary"
									onClick={() => {
										console.log(answer);
									}}
								>
									Отменить назначение
								</Button>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
		</ContentArea>
	);
};
