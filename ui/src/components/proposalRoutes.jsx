import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ContentArea } from './contentArea';
import { sendForm, findIdByName } from '../modules/helpers/utils';
import { url } from '../modules/helpers/constants';
import { AllRoutes } from './allRoutes';

export const methodProps = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    'Content-Type': 'application/json',
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

export const ProposalRoutes = (props) => {
  let [answer, setAnswer] = React.useState({ timeStart: 24 });
  let [formAnswer, setFormAnswer] = React.useState({
    notificationType: 'email',
  });

  React.useEffect(() => {
    let ignore = false;

    function fetchControllers() {
      return fetch(`${url}controllers/all`, {
        ...methodProps,
      }).then((res) => res.json());
    }
    function fetchExecutors() {
      return fetch(`${url}executors/all`, {
        ...methodProps,
      }).then((res) => res.json());
    }

    const answerStructure = {
      0: 'controllers',
      1: 'executor',
    };

    function all() {
      return Promise.all([fetchControllers(), fetchExecutors()]).then(
        (values) => {
          const result = values.reduce(
            (acc, value, idx) => {
              acc[answerStructure[idx]] = value;
              return acc;
            },
            { answer },
          );

          if (!ignore) return setAnswer(result);
        },
      );
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
          <Row>
            <Col lg={6} md={12}>
              <div className="card pt-0">
                <div className="card-header">
                  <h3>Создать маршрут</h3>
                </div>
                <div className="card-body">
                  <Form className="w-100">
                    <Form.Group as={Row}>
                      <Form.Label column>Название маршрута</Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          onInput={(e) =>
                            setFormAnswer({
                              ...formAnswer,
                              name: e.target.value,
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
                      <Form.Label column>Срок приянтия в работу (ч)</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          onInput={(e) =>
                            setFormAnswer({
                              ...formAnswer,
                              assignTimeRequired: parseInt(e.target.value),
                            })
                          }
                        />
                      </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                      <Form.Label column>Срок исполнения (ч)</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
                          onInput={(e) =>
                            setFormAnswer({
                              ...formAnswer,
                              executionTimeRequired:
                                e.target.value != '' &&
                                parseInt(e.target.value),
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
                          onChange={(e) => {
                            setFormAnswer({
                              ...formAnswer,
                              controllerId: findIdByName(
                                answer.controllers,
                                e.target.value,
                              ),
                            });
                          }}
                        >
                          {answer.controllers &&
                            answer.controllers.map((k) => (
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
                          onChange={(e) => {
                            setFormAnswer({
                              ...formAnswer,
                              executorId: findIdByName(
                                answer.executor,
                                e.target.value,
                              ),
                            });
                          }}
                        >
                          {answer.executor &&
                            answer.executor.map((k) => (
                              <option key={k.id}>
                                {`${k.surname} ${k.name} ${k.middleName}`}
                              </option>
                            ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group>
                      <Button
                        variant="primary"
                        onClick={() => {
                          sendForm('routes/new', formAnswer, (res) =>
                            console.log(res),
                          );
                        }}
                      >
                        Отправить
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg={6} md={12}>
              <AllRoutes />
            </Col>
          </Row>
        </Container>
      </section>
    </ContentArea>
  );
};
