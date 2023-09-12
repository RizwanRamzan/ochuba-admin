// import ApplcationRoutes from './Config/ApplicationRoutes'
import HomeRoutes from './Routes/HomeRoutes'
import Layout from './Component/Layout/Layout';
import AuthRoutes from './Routes/AuthRoutes';

function App() {

  const token = localStorage.getItem("token")

  return (
    <>
      {
        token ?
          <Layout>< HomeRoutes /></Layout >
          :
          <AuthRoutes />
      }
    </>
  )
}

export default App
