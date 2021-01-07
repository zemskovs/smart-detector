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
import { useHistory } from 'react-router-dom';

export const CreateCategoryPage = (props) => {
  let history = useHistory();
  let [answer, setAnswer] = React.useState([
    {
      id: null,
    },
  ]);
  let [formAnswer, setFormAnswer] = React.useState();
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  React.useEffect(() => {
    let ignore = false;
    function fetchProposal() {
      return fetch(`${url}routes/all`, {
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
            setAnswer(a);
            setFormAnswer({
              taskRouteId: a[0].id,
              shouldInformAboutAccident: false,
            });
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
                          {answer &&
                            answer.map((x) => (
                              <option key={x.id}>{x.name}</option>
                            ))}
                        </Form.Control>
                      </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Form.Label column>Приоритет</Form.Label>
                      <Col>
                        <Form.Control
                          type="number"
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
                        onChange={() =>
                          setFormAnswer({
                            ...formAnswer,
                            shouldInformAboutAccident: !formAnswer.shouldInformAboutAccident,
                          })
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Row}>
                      <Button
                        variant="primary"
                        onClick={() => {
                          sendForm('categories/new', formAnswer, () => {});
                          history.push('/allCategory');
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
