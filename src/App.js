import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.component";
import Sidebar from "./components/Sidebar.component";
import Cart from "./pages/Cart.page";
import Category from "./pages/Category.page";
import Dashboard from "./pages/Dashboard.page";
import NotFound from "./pages/NotFound.page";
import ProductDetails from "./pages/ProductDetails.page";
import Profile from "./pages/Profile.page";
import SearchProducts from "./pages/SearchProducts.page";
import SignIn from "./pages/Signin.page";
import SignUp from "./pages/Signup.page";
import Wishlist from "./pages/Wishlist.page";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      <Sidebar sideOpen={sidebarOpen} setSideOpen={setSidebarOpen} />
      <Navbar sideOpen={sidebarOpen} setSideOpen={setSidebarOpen} />

      <main className="flex-1 md:pl-72">
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/search/:id" element={<SearchProducts />} />
          <Route element={<PrivateRoute />}>
            <Route element={<Cart />} path="/cart" />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/category/:id" element={<Category />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
