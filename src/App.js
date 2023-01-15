import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.component";
import Sidebar from "./components/Sidebar.component";
import Cart from "./pages/Cart.page";
import Category from "./pages/Category.page";
import Dashboard from "./pages/Dashboard.page";
import Home from "./pages/Home.page";
import NotFound from "./pages/NotFound.page";
import ProductDetails from "./pages/ProductDetails.page";
import Profile from "./pages/Profile.page";
import SearchProducts from "./pages/SearchProducts.page";
import SignIn from "./pages/Signin.page";
import SignUp from "./pages/Signup.page";
import Wishlist from "./pages/Wishlist.page";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import { isLogin } from "./utils/Auth/authChecker";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    console.log("called useEffect from App JS");
    console.log(process.env.REACT_APP_BASE_URL);
    console.log(process.env.BASE_URL);
  }, []);

  return (
    <>
      {/* <div className='flex flex-col h-screen'>
        <ul>
          <Navbar />
          <li><Link to="/">Home</Link></li>
          <li><Link to="/signin">SignIn</Link></li>
          <li><Link to="/signup">SignUp</Link></li>
        </ul>
      </div> */}
      <div className="flex flex-col h-screen">
        {true ? (
          <>
            <Sidebar sideOpen={sidebarOpen} setSideOpen={setSidebarOpen} />
            <Navbar sideOpen={sidebarOpen} setSideOpen={setSidebarOpen} />
          </>
        ) : (
          <></>
        )}

        {/* <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4">
              <div className="h-96 rounded-lg border-4 border-dashed border-gray-200" />
            </div>
          </div>
        </div>
      </main> */}
        <main className="flex-1 md:pl-72 p-4">
          <Routes>
            {/* <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute restricted={true} component={SignIn} path="/signin" exact />
        <PublicRoute restricted={true} component={SignUp} path="/signup" exact />
        <PrivateRoute component={Dashboard} path="/dashboard" exact /> */}

            {/* <Route path="/" element={<Home />} /> */}
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
            <Route path="/category" element={<Category />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
