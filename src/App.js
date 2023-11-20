import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./reusable/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import NotFound from "./pages/NotFound/NotFound";
import { Inventory } from "./pages/Inventory/Inventory";
import { Categories } from "./pages/Categories/Categories";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";
import { Users } from "./pages/Users/Users";
import { Products } from "./pages/Products/Products";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
            <Layout>
                <Routes>
                  <Route path="/" element={<Dashboard/>} />
                  <Route path="/Inventario" element={<Inventory/>} />
                  <Route path="/categorias" element={<Categories/>} />
                  <Route path="/Productos" element={<Products/>} />
                  <Route path="/Usuarios" element={<Users/>} />
                  <Route path="*" element={<NotFound/>} />
                  <Route path='/categorias/borrar' component={<DeleteCategoryModal/>} />
                </Routes>
            </Layout>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
