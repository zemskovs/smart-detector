import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ContentArea } from './contentArea';
import { ProposalStatusControl } from './proposalStatus';
import { ProposalAnswer } from './proposalAnswer';
import { useParams, useHistory } from 'react-router-dom';
import { url } from '../modules/helpers/constants';
import { methodProps } from './proposalRoutes';
import { findById, findByCategory, getDate } from '../modules/helpers/utils';

export const ProposalCard = (props) => {
  let { id } = useParams();
  let history = useHistory();
  let categoryCurrent = React.useRef();

  let [formAnswer, setFormAnswer] = React.useState();
  let [answer, setAnswer] = React.useState({
    proposal: {
      date: '',
      category: [''],
      statuses: [
        {
          status: '',
          date: '',
          type: '',
        },
      ],
      controlMembers: [''],
      executorName: '',
    },
    categories: [],
  });

  React.useEffect(() => {
    let ignore = false;

    function fetchProposal() {
      return fetch(`${url}requests/${id}`, {
        ...methodProps,
      }).then((res) => res.json());
    }

    function fetchCategories() {
      return fetch(`${url}categories/all`, {
        ...methodProps,
      }).then((res) => res.json());
    }
    function fetchRoutes() {
      return fetch(`${url}routes/all`, {
        ...methodProps,
      }).then((res) => res.json());
    }
    function fetchExecutors() {
      return fetch(`${url}executors/all`, {
        ...methodProps,
      }).then((res) => res.json());
    }

    const answerStructure = {
      0: 'categories',
      1: 'routes',
      2: 'executor',
      3: 'proposal',
    };

    function all() {
      return Promise.all([
        fetchCategories(),
        fetchRoutes(),
        fetchExecutors(),
        fetchProposal(),
      ]).then((values) => {
        const result = values.reduce(
          (acc, value, idx) => {
            acc[answerStructure[idx]] = value;
            return acc;
          },
          { answer },
        );

        if (!ignore) return setAnswer(result);
      });
    }
    all();
    return () => {
      ignore = true;
    };
  }, [id]);

  let proposalID = id;
  const { text } = answer.proposal;
  categoryCurrent.current = findById(answer.categories, answer.proposal.id);
  const category = findById(answer.categories, answer.proposal.categoryId);
  const statusTypeToName = {
    new: 'Новая заявка',
    in_progress: 'В работе',
  };

  return (
    <ContentArea title={`Заявка ${proposalID}`}>
      <section className="dashboard-counts">
        <Container fluid>
          <Row>
            <Col md={6}>
              <Row className="bg-white has-shadow">
                <Form className="w-100">
                  <Form.Group as={Row}>
                    <Form.Label column>Категории</Form.Label>
                    <Col>
                      <Form.Control
                        as="select"
                        onChange={(e) =>
                          setFormAnswer({
                            ...formAnswer,
                            categoryId: findByCategory(
                              answer.categories,
                              e.target.value,
                            ),
                          })
                        }
                      >
                        {categoryCurrent.current && (
                          <option>{category && category.name}</option>
                        )}
                        {answer.categories &&
                          answer.categories
                            .filter((i) => i.id != answer.proposal.id)
                            .map((x, idx) => {
                              return (
                                <option key={x.name + idx}>{x.name}</option>
                              );
                            })}
                      </Form.Control>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row}>
                    <Form.Label column>Дата регистрации</Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        readOnly
                        defaultValue={getDate(new Date())}
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column>Срок исполнения (ч)</Form.Label>
                    <Col>
                      <Form.Control
                        type="number"
                        defaultValue={24}
                        onInput={(e) =>
                          setAnswer({
                            ...answer,
                            timeImplement: e.target.value,
                          })
                        }
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row}>
                    <Form.Label column>Исполнитель</Form.Label>
                    <Col>
                      <Form.Control
                        type="text"
                        readOnly
                        defaultValue={answer.proposal.executorName}
                      ></Form.Control>
                    </Col>
                  </Form.Group>
                </Form>
              </Row>
            </Col>

            <Col md={6}>
              <ProposalStatusControl
                items={
                  (answer.proposal.statuses.length > 1 &&
                    answer.proposal.statuses.map((x, idx) => ({
                      status: statusTypeToName[x.newTaskStatus],
                      type: x.newTaskStatus,
                    }))) || [
                    {
                      status: 'Заявка зарегистрирована',
                      type: 'in_progress',
                    },
                  ]
                }
              />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <ProposalAnswer text={text} />
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Row>
                <div style={{ paddingRight: '3em' }} className="d-flex">
                  {answer.proposal && answer.proposal.taskStatus == 'new' && (
                    <div className="pr-3">
                      <Button
                        variant="primary"
                        onClick={() => {
                          const body = {
                            ...formAnswer,
                            taskStatus: 'in_progress',
                          };

                          fetch(`${url}requests/update/${id}`, {
                            ...methodProps,
                            method: 'POST',
                            body: JSON.stringify(body),
                          });
                          location.reload();
                        }}
                      >
                        Взять в работу
                      </Button>
                    </div>
                  )}
                  <Button
                    variant="primary"
                    onClick={() => {
                      const body = {
                        ...formAnswer,
                        taskStatus: 'in_progress',
                      };

                      fetch(`${url}requests/update/${id}`, {
                        ...methodProps,
                        method: 'POST',
                        body: JSON.stringify(body),
                      });
                      location.reload();
                    }}
                  >
                    Сохранить изменения
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
