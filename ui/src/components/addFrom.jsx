import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import { sendForm } from '../modules/helpers/utils';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

export const AddFrom = (props) => {
  let [query, setQuery] = React.useState();
  let history = useHistory();

  return (
    <section className="dashboard-counts pb-0">
      <Container fluid>
        <Row>
          <Col md={12} lg={8}>
            <Row className="bg-white has-shadow">
              <Form className="w-100">
                <Form.Group as={Col}>
                  <Form.Label>Поиск из вконтакте</Form.Label>
                  <InputGroup className="w-100">
                    <Form.Control
                      type="text"
                      placeholder="vk.com/text"
                      aria-describedby="inputGroupPrepend"
                      required
                      onInput={(e) => setQuery(e.target.value)}
                    />
                    <InputGroup.Prepend>
                      {/* <InputGroup.Text>Поиск</InputGroup.Text> */}
                      <Button
                        variant="primary"
                        onClick={() =>
                          sendForm(
                            'requests/new',
                            {
                              socialNetwork: 'vk',
                              fromUrl: query,
                            },
                            (res) => {
                              history.push(`/card/${res.id}`);
                            },
                          )
                        }
                      >
                        Добавить
                      </Button>
                    </InputGroup.Prepend>
                    {/* <Form.Control.Feedback type="invalid">
									Пожалуйста, введите ссылку.
								</Form.Control.Feedback> */}
                  </InputGroup>
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
