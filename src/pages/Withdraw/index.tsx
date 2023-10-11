import { useMediaQuery } from "react-responsive";
import TopBar from "../../Component/Layout/topBar";
import DashboardTable from "./dasboardTable";
import { Col, Modal, Row, message } from "antd";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./dashboard.scss";

const Dashboard = () => {
  const mobileResponsive = useMediaQuery({
    query: "(max-width: 800px)",
  });

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const token = useSelector((state: any) => state.authReducer.Admintoken);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [endModal, setEndModal] = useState<any>({});
  const [editModal, setEditModal] = useState<any>({});
  const [deletEvent, setDelete] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const [user, setUser] = useState<any>({});

  const GetAllTrading = () => {
    setLoading(true);

    fetch(`${baseUrl}/api/v1/admin/trading/withdraw`, {
      method: "get",
      headers: {
        "x-sh-auth": token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setLoading(false);
        if (data?.success) {
          setData(data.data);
        }
      });
  };

  useEffect(() => {
    GetAllTrading();
  }, [token]);

  return (
    <>
      <TopBar title="Dashboard" />
      <Row>
        <Col span={24}>
          <h2 className="all-trading"> All Tradings </h2>
        </Col>
      </Row>
      <DashboardTable
        mobileResponsive={mobileResponsive}
        data={data}
        setUser={setUser}
      />

    </>
  );
};

export default Dashboard;
