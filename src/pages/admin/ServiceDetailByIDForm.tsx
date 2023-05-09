import React, { useEffect, useState } from 'react';
import { Badge, Col, Descriptions, Row, Image, Button, Modal, message, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getAuthorization } from '../../utils/tools';


// interface Service {
//     ID: number;
//     CreatedAt: string;
//     UpdatedAt: string;
//     DeletedAt: string | null;
//     user_id: number;
//     service_id: number;
//     content: string;
//     city: string;
//     prices: number;
//     address: string;
//     areas_coverd: string;
//     mobile: string;
//     Status: string;
//     category: string;
// }

// const defaultServiceData = [
//     {
//         ID: '',
//         name: 'John Brown',
//         age: 32,
//         address: 'New York No. 1 Lake Park',
//         tags: ['nice', 'developer'],
//     },
// ]


const App: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const defaultData = {
        ID: '',
        title: '',
        category: '',
        user_id: 0,
        Status: '',
        prices: 0,
        areas_coverd: 0,
        mobile: 0,
        CreatedAt: '',
        city: '',
        photos: '',
        description: ''
    }
    const [serviceData, setServiceData] = useState(defaultData)



    useEffect(() => {
        // console.log(document.getElementsByClassName('ant-table-cell')[0])
        let timer = setTimeout(() => {
            getServiceDetail();
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    const getServiceDetail = () => {

        // getAuthorization();
        axios.get('http://51.104.196.52:8090/api/v1/public/service/' + id, {

        })
            .then(res => {

                let { data } = res.data;
                // const { ID } = res.data.ID
                console.log('res.data');
                console.log(data);
                setServiceData(data)
            })

    }
    const { confirm } = Modal

    const serviceApprove = (r: any) => {
        confirm({
            title: 'Do you want to APPROVE this service?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                aprService(r)
            },
            onCancel() {
            },
        });
    }

    // 更改service status的逻辑
    const aprService = (ID: any) => {
        getAuthorization();
        axios.patch('http://51.104.196.52:8090/api/v1/service/approve/' + ID, {
        })
            .then(res => {
                if (res.data.code == 200) {
                    message.success(res.data.msg);
                } else {
                    message.error(res.data.msg);
                }
                setTimeout(() => {
                    window.location.href = "http://localhost:5173/admin/service_audit/"
                }, 200)

            })
    }

    const serviceReject = (ID: any) => {
        confirm({
            title: 'Do you want to REJECT service ' + ID + '?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                delService(ID)
            },
            onCancel() {
            },
        });
    };

    // 删除的逻辑
    const delService = (ID: any) => {
        getAuthorization();
        // delete service
        axios.delete('http://51.104.196.52:8090/api/v1/service/delete/' + ID, {
        })
            .then(res => {
                if (res.data.code == 200) {
                    message.success(res.data.msg);
                } else {
                    message.error(res.data.msg);
                }
                setTimeout(() => {
                    window.location.href = "http://localhost:5173/admin/service_audit/"
                }, 200)

            })
    }

    const backToServiceAudit = () => {
        getAuthorization();
        window.location.href = "http://localhost:5173/admin/service_audit/"
    }

    
    const backToReviewManagement = () => {
        getAuthorization();
        window.location.href = "http://localhost:5173/admin/review_management/"
    }


    return (
        <>
            <Row>
                <Col>
                    
                    <Space>
                        <h1>The details of service {id}</h1>
                        <Button size="small" type="primary" onClick={serviceApprove.bind(this, id)}>
                            Approve
                        </Button>
                        <Button size="small" type="primary" onClick={serviceReject.bind(this, id)} danger>
                            Reject
                        </Button>
                        <Button size="small" type="default" onClick={backToServiceAudit} >
                            Back to Service Audit
                        </Button>
                        <Button size="small" type="default" onClick={backToReviewManagement} >
                            Back to Review Management
                        </Button>

                </Space>
                </Col>
                {/* <Col offset={4}>
                    <Space>
                        
                            <Button size="large" type="primary" onClick={serviceApprove.bind(this, id)}>
                                Approve
                            </Button>
                            <Button size="large" type="primary" onClick={serviceReject.bind(this, id)} danger>
                                Reject
                            </Button>
                            <Button size="large" type="default" onClick={backToServiceAudit} >
                                Back to Service Audit
                            </Button>
                            <Button size="large" type="default" onClick={backToReviewManagement} >
                                Back to Review Management
                            </Button>

                    </Space>

                </Col> */}

            </Row>

            <Descriptions column={4} layout="vertical" bordered>
                <Descriptions.Item label="Service ID">{serviceData.ID}</Descriptions.Item>
                <Descriptions.Item label="Service title">{serviceData.title}</Descriptions.Item>
                <Descriptions.Item label="Service category">{serviceData.category}</Descriptions.Item>
                <Descriptions.Item label="Provider ID">{serviceData.user_id}</Descriptions.Item>

                <Descriptions.Item label="Status">{serviceData.Status}</Descriptions.Item>
                <Descriptions.Item label="prices">{serviceData.prices}</Descriptions.Item>
                <Descriptions.Item label="Areas covered">{serviceData.areas_coverd}</Descriptions.Item>
                <Descriptions.Item label="Phone">{serviceData.mobile}</Descriptions.Item>

                <Descriptions.Item label="Created date" span={1}>{serviceData.CreatedAt}</Descriptions.Item>
                <Descriptions.Item label="Status" span={1}>
                    <Badge status="processing" text={serviceData.Status} />
                </Descriptions.Item>
                <Descriptions.Item label="City" span={1}>{serviceData.city}</Descriptions.Item>


                <Descriptions.Item label="Picture" span={1}>
                    <Image
                        width={150}
                        height={60}
                        src="error"
                        fallback={serviceData.photos}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={4}>{serviceData.description}</Descriptions.Item>
            </Descriptions>
        </>
    )


};

export default App;