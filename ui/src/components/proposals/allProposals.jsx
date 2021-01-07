import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ContentArea } from '../contentArea';
import { url } from '../../modules/helpers/constants';
import { RecentCard } from '../recentCard';

export const AllProposalPage = (props) => {
  let [answer, setAnswer] = React.useState([
    {
      id: null,
      text: '',
    },
  ]);

  React.useEffect(() => {
    let ignore = false;
    function fetchProposal() {
      return fetch(`${url}requests/all`, {
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
          if (!ignore) return setAnswer(a);
        });
    }
    fetchProposal();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <ContentArea title="Все заявки">
      <section className="dashboard-counts no-padding-bottom">
        <Container fluid>
          <Row>
            <Col md={6}>
              {answer[0] && answer[0].id != null ? (
                <RecentCard answer={answer} />
              ) : (
                <Row className="bg-white has-shadow">
                  <Col md={12}>
                    <h3>Нет заявок</h3>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </ContentArea>
  );
};
