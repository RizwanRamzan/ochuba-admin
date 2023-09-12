import { Col, Form, Input, Row } from 'antd'
import { Ochuba } from '../../assets'
import "./auth.scss"
import '../../GeneralStyle/index.scss'
import { useNavigate } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate()
    const formHadler = (e: any) => {
        navigate('/admin/trading/sports')
        window.location.href = "admin/trading/sports"
        localStorage.setItem("token","tokennnnnnnnnnnnnnnnnnnnnnnn")
    }

    return (
        <div className='auth'>
            <Row style={{ width: "100%" }}>
                <Col span={24}>
                    <img width={50} src={Ochuba} />
                </Col>
            </Row>
            <div className='auth-box'>
                <div className='auth-fields'>
                    <Form onFinish={formHadler} layout='vertical'>
                        <Row>
                            <Col>
                                <h2>Admin Login</h2>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "please enter valid email" }]}>
                                    <Input className='ant-input-affix-wrapper' placeholder='Please enter your email' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item name="password" label="Password" rules={[{ required: true, message: "please enter password" }]}>
                                    <Input.Password className='ant-input-affix-wrapper' placeholder='Please enter your password' />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <button style={{ width: "100%" }}>Login</button>
                            </Col>
                        </Row>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login