import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./reusable/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import { Inventory } from "./pages/Inventory/Inventory";
import { Category } from "./pages/Category/Category";
import { Users } from "./pages/Users/Users";
import { Products } from "./pages/Products/Products";
import { Lotes } from "./pages/Lotes/Lotes";
import { UnidadMedida } from "./pages/UnidadMedida/UnidadMedida";
import { Categories } from "./pages/Categories/Categories";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
            <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/Inventario" element={<Inventory/>} />
                  <Route path="/categorias" element={<Category/>} />
                  <Route path="/category" element={<Categories/>} />
                  <Route path="/Productos" element={<Products/>} />
                  <Route path="/Usuarios" element={<Users/>} />
                  <Route path="/Lotes" element={<Lotes/>} />
                  <Route path="/UnidadMedida" element={<UnidadMedida/>} />
                  <Route path="*" element={<NotFound/>} />
                </Routes>
            </Layout>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
