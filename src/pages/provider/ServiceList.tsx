import React from 'react'

import serviceList from '../../provider_data/services.json'
import { Col, Row } from "antd"
import { ServiceLayout } from '../../components/ServiceLayout'


function ServiceList() {
  return (
    <>
      <h1> Service List</h1>
      <Row className="g-3" >
        {/* loop */}
        {serviceList.map((item: any) => (
          <Col key={item.id}>
            <ServiceLayout {...item} />
          </Col>
        ))}
      </Row>
    </>

  )
}

export default ServiceList