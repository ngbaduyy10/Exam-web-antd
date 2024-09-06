import { Layout } from 'antd';
import {Outlet} from 'react-router-dom';
import logo from '../../images/logo.png';
import logoFold from '../../images/logo-fold.png';
import './layoutDefault.scss';
import { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import MenuSider from '../../components/MenuSider';
import {getCookie} from "../../helpers/cookie";
import {useSelector} from "react-redux";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const { Sider, Content } = Layout;

function LayoutDefault () {
    const [collapse, setCollapse] = useState(false);
    const navigate = useNavigate();
    const token = getCookie("token");
    const reload = useSelector(state => state.reloadReducer);

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/logout")
            }
        });
    }

    return (
        <>
            <Layout className="layout-default">
                <header className="header">
                    <div className={"header__logo" + (collapse ? " header__logo--collapse" : "")}>
                        <img src={collapse ? logoFold : logo} alt="Logo" />
                    </div>
                    <div className="header__nav">
                        <div className="header__nav--left">
                            {token && (
                                <div className="header__collapse" onClick={() => setCollapse(!collapse)}>
                                    {collapse ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                                </div>
                            )}
                        </div>
                        <div className="header__nav--right">
                            {token ? (
                                <Button onClick={handleLogout}>Logout</Button>
                            ) : (
                                <>
                                    <NavLink to="/login">
                                        <Button>Login</Button>
                                    </NavLink>
                                    <NavLink to="/register">
                                        <Button>Register</Button>
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </header>

                <Layout>
                    {token && (
                        <Sider className="sider" collapsed={collapse} theme={"light"}>
                            <MenuSider />
                        </Sider>
                    )}
                    <Content className="content">
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </>
    )
}
export default LayoutDefault;