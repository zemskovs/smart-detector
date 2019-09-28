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

export const ProposalCard = props => {
	let { id } = useParams();
	let [answer, setAnswer] = React.useState({
		date: "",
		category: ["Сантехника"],
		statuses: [
			{
				status: "Заявка зарегистрирована",
				date: "29.08.2018",
				type: "reg"
			}
		],
		controlMembers: [""]
	});

	React.useEffect(() => {
		let ignore = false;
		function fetchProposal() {
			return fetch(`${url}analyze`, {
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
				.then(a => {
					if (!ignore) return setAnswer(a);
				});
		}
		fetchProposal();
		return () => {
			ignore = true;
		};
	}, [id]);

	let proposalID = id;
	console.log(answer)
	const { date, statuses, controlMembers, category } = answer;

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
												{category.map(x => (
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
											fetch(`${url}requests/${id}`, {
												method: "UPDATE",
												body: JSON.stringify({
													task_status: "in_progress"
												})
											});
										}}
									>
										Взять в работу
									</Button>
								</div>
							</Row>
						</Col>
					</Row>
				</Container>
			</section>
		</ContentArea>
	);
};
