import * as React from 'react';
import { ContentArea } from '../../components/contentArea';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AllCategory } from '../../components/allCategory';
import { url } from '../../modules/helpers/constants';
import { sendForm } from '../../modules/helpers/utils';
import { useHistory, useParams } from 'react-router-dom';
import { findById } from '../../modules/helpers/utils';
import { methodProps } from '../../components/proposalRoutes';

export const EditCategoryPage = (props) => {
  let { id } = useParams();
  let history = useHistory();
  let answerRef = React.useRef();
  let [answer, setAnswer] = React.useState([
    {
      id: null,
    },
  ]);
  let [formAnswer, setFormAnswer] = React.useState();

  React.useEffect(() => {
    let ignore = false;
    function fetchProposal() {
      return fetch(`${url}categories/all`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrer: 'no-referrer',
      })
        .then((res) => res.json())
        .then((a) => {
          if (!ignore) {
            setAnswer(findById(a, id));
          }
        });
    }

    fetchProposal();

    return () => {
      ignore = true;
    };
  }, []);

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
                      <Form.Label column>Код категории</Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          defaultValue={answer.code}
                          onInput={(e) =>
                            setFormAnswer({
                              ...formAnswer,
                              code: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column>Наименование</Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          defaultValue={answer.name}
                          onInput={(e) =>
                            setFormAnswer({
                              ...formAnswer,
                              name: e.target.value,
                            })
                          }
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column>Маршрут</Form.Label>
                      <Col>
                        <Form.Control
                          as="select"
                          onChange={(e) => {
                            const item = answer.find(
                              (i) => i.name == e.target.value,
                            );
                            item &&
                              setFormAnswer({
                                ...formAnswer,
                                taskRouteId: item.id,
                              });
                            debugger;
                          }}
                        >
                          <option>{answer.taskRouteId}</option>
                          {/* {answer &&
														answer.map(x => (
															<option key={x.id}>
																{x.name}
															</option>
														))} */}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column>Приоритет</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          defaultValue={answer.priority}
                          onInput={(e) =>
                            setFormAnswer({
                              ...formAnswer,
                              priority: parseInt(e.target.value),
                            })
                          }
                        ></Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Check
                        type="checkbox"
                        label="Информация об аварии"
                        type="checkbox"
                        defaultChecked={answer.shouldInformAboutAccident}
                        onChange={() =>
                          setFormAnswer({
                            ...formAnswer,
                            shouldInformAboutAccident: !formAnswer.shouldInformAboutAccident,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Row}>
                      {/* <Button
												variant="primary"
												onClick={() => {
													console.log(answer);
													debugger;
													// sendForm(
													// 	"categories/new",
													// 	formAnswer,
													// 	() => {}
													// );
													// history.push(
													// 	"/allCategory"
													// );
												}}
											>
												Сохранить
											</Button> */}
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </ContentArea>
  );
};
