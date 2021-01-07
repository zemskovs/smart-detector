import * as React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import { ContentArea } from './contentArea';
import { url } from '../modules/helpers/constants';
import { RecentCard } from './recentCard';

export const AllCategory = (props) => {
  let [answer, setAnswer] = React.useState([
    {
      name: null,
    },
  ]);

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
    <>
      {answer[0] && answer[0].name != null ? (
        <div className="card pt-0">
          <div className="card-header">
            <h3>Все категории</h3>
          </div>
          <div className="card-body">
            {answer.map((i, idx) => (
              <div key={idx} className="item d-flex">
                <Link to={`/all_cat/${i.id}`}>{i.name}</Link>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Row className="bg-white has-shadow">
          <Col md={12}>
            <h3>Нет категорий</h3>
          </Col>
        </Row>
      )}
    </>
  );
};
