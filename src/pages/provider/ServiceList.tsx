import React from 'react'

import serviceList from '../../provider_data/services.json'
import { Col, Row } from "react-bootstrap"
import {ServiceLayout}  from '../../components/ServiceLayout'


function ServiceList() {
  return (
    <>
      <h1> Service List</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {serviceList.map(item => (
          <Col key={item.id}>
            <ServiceLayout {...item} />
          </Col>
        ))}
      </Row>
    </>

  )
}

export default ServiceList