import { Col, Form, Input, Row } from "antd"
import TopBar from "../../../Component/Layout/topBar"
import { useState } from "react";
import { ImgUpload } from "../../../assets";



type contectData = {
    image: any
}

const Media = () => {



    const [team1, setTeam1] = useState<contectData>({
        image: null,
    });

    const [team2, setTeam2] = useState<contectData>({
        image: null,
    });


    const handleTeam1 = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setTeam1({ image: reader.result });
        };
    };

    const handleTeam2 = (event: any) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setTeam2({ image: reader.result });
        };
    };


    return (
        <>
            <TopBar title="Media" breadcrumb={true} consdition={true} />
            <Form layout='vertical' style={{ marginTop: "20px" }}>

                <Row gutter={10}>

                    <Col span={12}>
                        <div className="form-left">
                            {team1.image ? (
                                <>
                                    <label className="image-upload-button" htmlFor="image-upload1" onClick={handleTeam1}>
                                        <img src={team1.image} alt="uploaded" />
                                        <span>Team 1</span>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="image-upload-button" htmlFor="image-upload1">
                                        <img src={ImgUpload} />
                                        <span>Team 1</span>
                                    </label>
                                </>
                            )}
                            <input
                                style={{ display: "none" }}
                                required
                                id="image-upload1"
                                type="file"
                                accept="image/*"
                                onChange={handleTeam1}

                            />
                        </div>
                    </Col>

                    <Col span={12}>
                        <div className="form-left">
                            {team2.image ? (
                                <>
                                    <label className="image-upload-button" htmlFor="image-upload2" onClick={handleTeam2}>
                                        <img src={team2.image} alt="uploaded" />
                                        <span>Team 2</span>
                                    </label>
                                </>
                            ) : (
                                <>
                                    <label className="image-upload-button" htmlFor="image-upload2">
                                        <img src={ImgUpload} />
                                        <span>Team 2</span>
                                    </label>
                                </>
                            )}
                            <input
                                style={{ display: "none" }}
                                required
                                id="image-upload2"
                                type="file"
                                accept="image/*"
                                onChange={handleTeam2}

                            />
                        </div>
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
                    <Col span={12}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <button style={{ width: "100px" }}>Submit</button>
                    </Col>
                </Row>
            </Form>
        </>
    )
}


export default Media