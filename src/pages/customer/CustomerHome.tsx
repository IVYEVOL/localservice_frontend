import React, { useEffect, useState } from 'react';
import {Card, Col, Pagination, Row } from 'antd';
import axios from 'axios';

interface Service {
  key: number;
  ID: number;
  title: string;
  prices: number;
  city: string;
  description: string;
  address: string;
  category: string;
  photos: string;
  Status: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string | null;
  areas_coverd: number;
  availibility: string;
  longitude_latitude: string;
  mobile: string;
  user_id: number;
}

const PAGE_SIZE = 6;
const { Meta } = Card;
const ProductCard = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchServices(currentPage);
  }, [currentPage]);

  const fetchServices = (page: number) => {
    axios
      .post('http://51.104.196.52:8090/api/v1/public/service/list', {
        page,
        limit: PAGE_SIZE,
      })
      .then((res) => {

        const services: Service[] = res.data.data.map((service: any, index: number) => ({
            key: index,
            ID: service.ID,
            title: service.title,
            prices: service.prices,
            city: service.city,
            photos: service.photos,
            Status: service.Status,
            category: service.category,
            DeletedAt: service.DeletedAt,
            CreatedAt: service.DeletedAt,
            UpdatedAt: service.DeletedAt,
            areas_coverd: service.areas_coverd,
            availibility: service.availibility,
            longitude_latitude: service.longitude_latitude,
            mobile: service.mobile,
            user_id: service.user_id,
        }));

        setServices(services);
        // setServices(res.data.services);
        setTotal(res.data.total);
        console.log(services);
      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
        <div style={{ padding: '24px' }}>
            <Row gutter={[16, 16]}>
            {services.map((service) => (
                <Col xs={24} sm={12} md={8} key={service.ID}>
                <Card
                    hoverable
                    style={{ height: '400px', width: '300px', margin: '0 100px 0 150px' }}
                    cover={<img alt="example" src={service.photos} style={{ height: '200px', objectFit: 'cover' }} />}
                >
                    <Meta title={service.title} description={service.city} />
                    <div style={{ marginTop: '16px' }}>
                    <span style={{ fontWeight: 'bold' }}>价格: </span>
                    {service.prices}
                    </div>
                </Card>
                </Col>
            ))}
        </Row>
        
        <div style={{ textAlign: 'center' }}>
            <Pagination
                current={currentPage}
                pageSize={PAGE_SIZE}
                total={total}
                onChange={(page) => setCurrentPage(page)}
            />
        </div>
    </div>
  );
};

export default ProductCard;
