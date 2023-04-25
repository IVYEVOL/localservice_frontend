import "react"
import { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

const items: MenuProps['items'] = [
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Cleaning
            </a>
        ),
        key: 'Cleaning',
    },
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Electrical repairs
            </a>
        ),
        key: 'Electrical repairs',
    },
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Babysitting         
            </a>
        ),
        key: 'Babysitting ',
    },
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Beauty
            </a>
        ),
        key: 'Beauty',
    },
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Pest control
            </a>
        ),
        key: 'Pest control',
    },
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Plumbing
            </a>
        ),
        key: 'Plumbing',
    },
    {
        label: (
            <a href="" target="_blank" rel="noopener noreferrer">
                Other services
            </a>
        ),
        key: 'Other services',
    },
];

const HeaderMenu: React.FC = () => {
    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};

export default HeaderMenu;







