import { Menu } from 'antd';
import { items } from './menuItems';
import {useLocation} from 'react-router-dom';

function MenuSider () {
    const pathName = useLocation().pathname;

    return (
        <>
            <Menu
                mode="inline"
                defaultSelectedKeys={[pathName]}
                items={items}
            />
        </>
    )
}

export default MenuSider;