import * as React from 'react';
import { ContentArea } from '../../components/contentArea';
import { useParams } from 'react-router-dom';
import { url } from '../../modules/helpers/constants';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

export const RouteInfoPage = (props) => {
  let { id } = useParams();
  let [answer, setAnswer] = React.useState({
    id: null,
    name: null,
    notificationType: null,
  });

  React.useEffect(() => {
    let ignore = false;
    function fetchProposal() {
      return fetch(`${url}routes/${id}`, {
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

  console.log(answer);

  return (
    <ContentArea title="Категории">
      <section className="dashboard-counts">
        <Row>
          <Col md={6}>
            <div className="card pt-0">
              <div className="card-header">
                <h3>Информация о маршруте</h3>
              </div>
              <div className="card-body">
                <div className="item d-flex">
                  <h4>{answer.name}</h4>
                </div>
                <div className="item d-flex">
                  <p>
                    Время исполнения:
                    {answer.assignTimeRequired}
                  </p>
                </div>
                <div className="item d-flex">
                  <p>
                    Тип оповещения:
                    {answer.notificationType}
                  </p>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </section>
    </ContentArea>
  );
};
