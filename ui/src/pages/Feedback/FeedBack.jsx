import * as React from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { url } from '../../modules/helpers/constants';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';

export const Feedback = (props) => {
  let [name, setName] = React.useState({});
  let [text, setText] = React.useState({});

  function sendForm() {
    fetch(`${url}feedback`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',

      body: JSON.stringify({ name: name, text: text }),
    }).then(() => {
      props.history.push('/');
    });
  }

  return (
    <>
      <Navbar title="Оставить заявку" />
      <Container style={{ paddingTop: '3em' }}>
        <Row>
          <Form className="w-100">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                onInput={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Жалоба</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                onInput={(e) => setText(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={sendForm}>
              Отправить
            </Button>
          </Form>
        </Row>
      </Container>
      <Footer />
    </>
  );
};
