import { Form, Input, Button } from 'antd';
import { login } from '../../services/userService';
import './login.scss';
import {setCookie} from "../../helpers/cookie";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {setReload} from "../../actions/setReload";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

function Login () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onFinish = async (value) => {
        const response = await login(value.email, value.password);
        if (response) {
            setCookie("id", response.id);
            setCookie("fullName", response.fullName)
            setCookie("email", response.email);
            setCookie(" password", response.password);
            setCookie("token", response.token);
            navigate("/");
            dispatch(setReload());
        } else {
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Wrong email or password!",
            });
        }
    }

    return (
        <>
            <div className="form">
                <Form name="login" className="form__login" layout="vertical" onFinish={onFinish}>
                    <h1>Login</h1>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Login;