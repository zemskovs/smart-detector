import * as React from 'react';
import { ContentArea } from './contentArea';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { AllCategory } from './allCategory';
import { url } from '../modules/helpers/constants';
import { sendForm } from '../modules/helpers/utils';

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
