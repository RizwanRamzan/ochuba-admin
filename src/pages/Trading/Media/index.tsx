import { Col, Form, Input, Row } from "antd"
import TopBar from "../../../Component/Layout/topBar"

const Media = () => {


    return (
        <>
            <TopBar title="Media" breadcrumb={true} consdition={true} />
            <Form layout='vertical' style={{ marginTop: "20px" }}>
                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </>
    )
}


export default Media