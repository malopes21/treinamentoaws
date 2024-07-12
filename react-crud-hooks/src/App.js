import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Users from "./Users";
import Products from "./Products";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                <Route path="users" element={<Users />} />
                <Route path="products" element={<Products />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;