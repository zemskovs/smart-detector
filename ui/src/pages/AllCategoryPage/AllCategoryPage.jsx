import * as React from 'react';
import { ContentArea } from './contentArea';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { AllCategory } from '../../components/allCategory';

export const AllCategoryPage = (props) => (
  <ContentArea>
    <section className="dashboard-counts">
      <Container fluid>
        <Row>
          <Col md={8}>
            <AllCategory />
          </Col>
        </Row>
      </Container>
    </section>
  </ContentArea>
);
