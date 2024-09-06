import { Form, Input, Button } from 'antd';
import './register.scss';
import {checkEmail, register} from '../../services/userService';
import {generateToken} from '../../helpers/generateToken';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import {setCookie} from "../../helpers/cookie";
import {setReload} from "../../actions/setReload";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

function Register () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onFinish = async (value) => {
        const check = await checkEmail(value.email);
        if (check.length > 0) {
            await Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Email already exists!",
            });
        } else {
            await Swal.fire({
                icon: "success",
                title: "Success",
                text: "Register successfully!",
            });
            const data = {
                ...value,
                token: generateToken()
            }
            const response = await register(data);
            if (response) {
                setCookie("id", response.id);
                setCookie("fullName", response.fullName)
                setCookie("email", response.email);
                setCookie(" password", response.password);
                setCookie("token", response.token);
                navigate("/");
                dispatch(setReload());
            }
        }
    }

    return (
        <>
            <div className="form">
                <Form name="register" layout="vertical" className="form__register" onFinish={onFinish}>
                    <h1>Register</h1>
                    <Form.Item
                        label="FullName"
                        name="fullName"
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
                            Register
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Register;