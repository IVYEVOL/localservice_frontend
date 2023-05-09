import React, { useEffect, useState } from 'react';
import { Badge, Col, Descriptions, Row, Image, Button, Modal, message, Space } from 'antd';
import Title from 'antd/lib/typography/Title';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { getAuthorization } from '../../utils/tools';

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
    const [providerData, setProviderData] = useState(defaultData)



    useEffect(() => {
        // console.log(document.getElementsByClassName('ant-table-cell')[0])
        let timer = setTimeout(() => {
            getProviderDetail();
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    const getProviderDetail = () => {

        getAuthorization();
        axios.get('http://51.104.196.52:8090/api/v1/user/' + id, {

        })
            .then(res => {

                let { data } = res.data;
                // const { ID } = res.data.ID
                console.log('res.data');
                console.log(data);
                setProviderData(data)
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


    return (
        <>
            <Row>
                <Col offset={9}>
                    <Title>The details of service {id}</Title>
                </Col>
                <Col offset={4}>
                    <Space>
                        
                            <Button size="large" type="primary" onClick={serviceApprove.bind(this, id)}>
                                Approve
                            </Button>
                            <Button size="large" type="primary" onClick={serviceReject.bind(this, id)} danger>
                                Reject
                            </Button>
                            <Button size="large" type="default" onClick={backToServiceAudit} >
                                Back
                            </Button>
                        

                    </Space>

                </Col>

            </Row>

            <Descriptions column={4} layout="vertical" bordered>
                <Descriptions.Item label="Service ID">{providerData.ID}</Descriptions.Item>
                <Descriptions.Item label="Service title">{providerData.title}</Descriptions.Item>
                <Descriptions.Item label="Service category">{providerData.category}</Descriptions.Item>
                <Descriptions.Item label="Provider ID">{providerData.user_id}</Descriptions.Item>

                <Descriptions.Item label="Status">{providerData.Status}</Descriptions.Item>
                <Descriptions.Item label="prices">{providerData.prices}</Descriptions.Item>
                <Descriptions.Item label="Areas covered">{providerData.areas_coverd}</Descriptions.Item>
                <Descriptions.Item label="Phone">{providerData.mobile}</Descriptions.Item>

                <Descriptions.Item label="Created date" span={1}>{providerData.CreatedAt}</Descriptions.Item>
                <Descriptions.Item label="Status" span={1}>
                    <Badge status="processing" text={providerData.Status} />
                </Descriptions.Item>
                <Descriptions.Item label="City" span={1}>{providerData.city}</Descriptions.Item>


                <Descriptions.Item label="Picture" span={1}>
                    <Image
                        width={150}
                        height={150}
                        src="error"
                        fallback={providerData.photos}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="Description" span={4}>{providerData.description}</Descriptions.Item>
            </Descriptions>
        </>
    )


};

export default App;