import {HomeOutlined, PicLeftOutlined, ForwardOutlined} from "@ant-design/icons";
import {Link, NavLink} from "react-router-dom";

export const items = [
    {
        key: '/',
        icon: <HomeOutlined />,
        label: <NavLink to = "/">Home</NavLink>,
    },
    {
        key: '/topic',
        icon: <PicLeftOutlined />,
        label: <Link to="/topic">Topic</Link>,
    },
    {
        key: '/answers',
        icon: <ForwardOutlined />,
        label: <Link to="/answers">Answers</Link>,
    }
];