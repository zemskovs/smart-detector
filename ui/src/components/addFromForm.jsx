import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { sendForm } from '../modules/helpers/utils';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

export const AddFromForm = (props) => {
  let [query, setQuery] = React.useState();
  let history = useHistory();

  return (
    <section className="dashboard-counts pt-0">
      <Container fluid>
        <Row>
          <Col md={12} lg={8}>
            <Row className="bg-white has-shadow">
              <Form className="w-100">
                <Form.Group as={Col}>
                  <Form.Label>Жалоба</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows="3"
                    onInput={(e) => setQuery(e.target.value)}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Button
                    variant="primary"
                    onClick={() =>
                      sendForm(
                        'requests/new',
                        {
                          socialNetwork: 'email',
                          text: query,
                          name: 'Пользователь 1',
                        },
                        (res) => {
                          history.push(`/card/${res.id}`);
                        },
                      )
                    }
                  >
                    Отправить
                  </Button>
                </Form.Group>
              </Form>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
