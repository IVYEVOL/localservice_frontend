import "react"
import { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, MenuProps } from 'antd';
import { Menu } from 'antd';
import { NavLink, Outlet } from "react-router-dom";

interface HeaderMenuProps {
    onFilterCategory: (category: string) => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ onFilterCategory }) => {

    const items: MenuProps['items'] = [
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('')}>
                    All
                </Button>
            ),
            key: 'All',
        },
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('Cleaning')}>
                    Cleaning
                </Button>
            ),
            key: 'Cleaning',
        },
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('Electrical Repairs')}>
                    Electrical Repairs
                </Button>
            ),
            key: 'Electrical repairs',
        },
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('Babysitting')}>
                    Babysitting
                </Button>

            ),
            key: 'Babysitting ',
        },
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('Beauty')}>
                    Beauty    
                </Button>
            ),
            key: 'Beauty',
        },
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('Pest Control')}>
                    Pest Control
                </Button>
            ),
            key: 'Pest Control',
        },
        {
            label: (
                <Button style={{ border: 'none' }} onClick={() => onFilterCategory('Plumbing')}>
                    Plumbing
                </Button>
            ),
            key: 'Plumbing',
        },
    ];

    const [current, setCurrent] = useState('mail');
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
        // if (e.key === 'Cleaning') {
        //     onFilterCategory('Cleaning');
        // }
        onFilterCategory(e.key);
    };


    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}>
            <Outlet />
        </Menu>
    );
};

export default HeaderMenu;







