import { Col, Form, Input, Row, DatePicker, TimePicker } from "antd";
const { TextArea } = Input;
import TopBar from "../../../Component/Layout/topBar";
import { useState } from "react";
import { ImgUpload } from "../../../assets";
import "./sports.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

type contectData = {
  image: any;
};

const Sports = () => {
  const token = useSelector((state: any) => state.authReducer.token);
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [dataBody, setDataBody] = useState({
    title: "",
    resolution: "",
    endDate: "", // Add endDate and endTime fields to dataBody
    endTime: "",
  });
  const [img, setImg] = useState<File | null>(null);
  const [team1, setTeam1] = useState<contectData>({
    image: null,
  });

  const handleTeam1 = (event: any) => {
    const file = event.target.files[0];
    setImg(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setTeam1({ image: reader.result });
    };
  };

  const formHandler = async () => {
    let formData = new FormData();
    Object.entries(dataBody).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (img) {
      formData.append("image", img);
    }
    fetch(`${baseUrl}/api/v1/admin/trading/sports`, {
      method: "post",
      headers: {
        "x-sh-auth": token,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDataBody({
          title: "",
          resolution: "",
          endDate: "",
          endTime: "",
        });
      });
  };

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setDataBody({ ...dataBody, [name]: value });
  };

  return (
    <>
      <TopBar title="Sports" breadcrumb={true} consdition={true} />
      <Form
        onFinish={formHandler}
        layout="vertical"
        style={{ marginTop: "20px", paddingBottom: "30px" }}
        encType="multipart/form-data"
      >
        <Row gutter={10}>
          <Col span={18}>
            <div className="form-left">
              {team1.image ? (
                <>
                  <label
                    className="image-upload-button"
                    htmlFor="image-upload1"
                    onClick={handleTeam1}
                  >
                    <img src={team1.image} alt="uploaded" />
                    <span>Team 1</span>
                  </label>
                </>
              ) : (
                <>
                  <label
                    className="image-upload-button"
                    htmlFor="image-upload1"
                  >
                    <img src={ImgUpload} />
                    <span>Team 1</span>
                  </label>
                </>
              )}
              <input
                style={{ display: "none" }}
                id="image-upload1"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleTeam1}
              />
            </div>
          </Col>

          <Col span={18}>
            <Form.Item name="title" label="Title">
              <Input
                placeholder="Enter the Trade Title"
                name="title"
                id="title"
                value={dataBody.title}
                onChange={onChange}
              />
            </Form.Item>
          </Col>
          <Col span={18}>
            <Form.Item name="resolution" label="Resolution">
              <TextArea
                placeholder="Enter Resolution"
                name="resolution"
                id="resolution"
                rows={4}
                value={dataBody.resolution}
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item name="endDate" label="End Date">
              <Input
                type="date"
                name="endDate"
                id="endDate"
                onChange={onChange}
              />
            </Form.Item>
          </Col>

          <Col span={18}>
            <Form.Item name="endTime" label="End Time">
              <Input
                type="time"
                name="endTime"
                id="endTime"
                onChange={onChange}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col>
            <button style={{ width: "100px" }}>Submit</button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Sports;
