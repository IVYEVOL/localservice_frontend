import React, { useEffect, useRef, useState } from 'react';
// import './index.css';
import { ExclamationCircleFilled, FrownTwoTone, MehTwoTone, SearchOutlined, SmileTwoTone } from '@ant-design/icons';
import { Badge, InputRef, Modal, Tag, Typography, message } from 'antd';
import { Button, Input, Space, Table } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { getAuthorization } from '../../utils/tools';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Title from 'antd/lib/typography/Title';


interface DataType {
    key: number;
    // ID: review id
    ID: number;
    // content
    content: string
    // review rating
    rating: number


}

type DataIndex = keyof DataType;

const ServiceReviews = () => {

    const { id } = useParams<{ id: string }>();
    // const serviceId = Number(id); // 将id转换为number类型
    // console.log('接收的id为' + serviceId)

    const { confirm } = Modal;

    const deleteReview = (r: any) => {
        confirm({
            title: 'Do you want to DELETE this review, ID: ' + r.ID + '?',
            icon: <ExclamationCircleFilled />,
            content: 'Are you sure?',
            okText: 'Yes',
            cancelText: 'No',
            onOk() {
                delReview(r)
            },
            onCancel() {
            },
        });
    };

    // 删除的逻辑
    const delReview = (r: any) => {
        getAuthorization();
        // delete service
        axios.delete('http://51.104.196.52:8090/api/v1/review/' + r.ID, {
        })
            .then(res => {
                if (res.data.code == 200) {
                    message.success(res.data.msg);
                } else {
                    message.error(res.data.msg);
                }
                setTimeout(() => {
                    showTable();
                }, 200)

            })
    }
    /* 在组件挂载或者即将挂载的时候调用*/
    useEffect(() => {
        // console.log(document.getElementsByClassName('ant-table-cell')[0])
        let timer = setTimeout(() => {
            showTable();
        }, 0)

        return () => clearTimeout(timer)
    }, [])

    const [data, setData] = useState()

    const showTable = () => {

        // getAuthorization();
        axios.get('http://51.104.196.52:8090/api/v1/public/review/list/' + id, {

        })
            .then(res => {

                let { data } = res.data;

                data.forEach((r: { key: any; }, i: any) => {
                    r.key = i + 1;
                });
                setData(data)
            })
    }


    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    const columns: ColumnsType<DataType> = [
        {
            title: 'No',
            dataIndex: 'key',
            key: 'key',
            sorter: (a, b) => a.key - b.key,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Review ID',
            dataIndex: 'ID',
            key: 'ID',
            ...getColumnSearchProps('ID'),
            sorter: (a, b) => a.ID - b.ID,
            sortDirections: ['descend', 'ascend'],
            width: 100
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            render: (text: any) => {
                if (text == 0 || text == 1) {
                    return (
                        <Space>
                            <Tag style={{ width: '80px', height: '30px', fontSize: '15px' }} color="error">Score: {text}</Tag>
                            <FrownTwoTone style={{ fontSize: '30px' }} />
                        </Space>
                    )
                } else if (text == 2 || text == 3) {
                    return (
                        <Space>
                            <Tag style={{ width: '80px', height: '30px', fontSize: '15px' }} color="warning">Score: {text}</Tag>
                            <MehTwoTone style={{ fontSize: '30px' }} />
                        </Space>
                    )
                } else if (text == 4 || text == 5) {
                    return (
                        <Space>
                            <Tag style={{ width: '80px', height: '30px', fontSize: '15px' }} color="success">Score: {text}</Tag>
                            <SmileTwoTone style={{ fontSize: '30px' }} />
                        </Space>
                    )
                }
            },
            sorter: (a, b) => a.rating - b.rating,
            sortDirections: ['descend', 'ascend'],
        },

        {
            title: 'Review Content',
            dataIndex: 'content',
            key: 'content',
            ...getColumnSearchProps('content'),
            sorter: (a, b) => a.ID - b.ID,
            sortDirections: ['descend', 'ascend'],
            render: (text) => (
                <Typography.Text style={{ fontSize: 15 }}>
                    {text}
                </Typography.Text>
            )
        },
        {
            title: 'Action',
            key: 'action',

            render: (text) => (
                <Space size="middle">
                    <Button type="primary" onClick={deleteReview.bind(this, text)} danger>
                        Delete
                    </Button>
                </Space>
            ),

        },
    ];

    

    return (
        <>
            <div>
                <Title>The reviews of service {id}</Title>
                <Table columns={columns} dataSource={data} bordered />
            </div>

        </>
    );
};

export default ServiceReviews;