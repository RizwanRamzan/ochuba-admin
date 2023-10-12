import { Table } from "antd";
// General Style
import "../../GeneralStyle/index.scss";

const DashboardTable = ({ mobileResponsive, data}: any) => {
  console.log(data, "dataaaaaaaaaaaaaaaaaaaa");

  const columns = [
    {
      key: "1",
      title: "IBAN",
      render: (_: any, object: any) => object?.IBAN || "-",
      width: "22%",
    },
    {
      key: "2",
      title: "Amount",
      render: (_: any, object: any) => object?.Amount || "-",
      width: "22%",
    },
    {
      key: "3",
      title: "Email",
      render: (_: any, object: any) => object?.User.email || "-",
      width: "22%",
    },
    {
      key: "4",
      title: "Date",
      render: (_: any, object: any) => object?.Date || "-",
      width: "22%",
    }
  ];

  return (
    <div className="MainTable">
      <Table
        className="Table"
        scroll={mobileResponsive ? { x: 1300, y: 660 } : {}}
        onChange={(e) => console.log(e)}
        columns={columns}
        dataSource={data}
        size="small"
      />
    </div>
  );
};

export default DashboardTable;
