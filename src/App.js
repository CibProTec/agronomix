import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./reusable/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import { Inventory } from "./pages/Inventory/Inventory";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
            <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/Products" element={<Dashboard/>} />
                  <Route path="/Inventory" element={<Inventory/>} />
                  <Route path="/Users" element={<Dashboard/>} />
                  <Route path="*" element={<NotFound/>} />
                </Routes>
            </Layout>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
