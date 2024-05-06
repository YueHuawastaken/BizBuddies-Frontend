// CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// React Router
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Context
import SupplierContextData from './context/supplier-context';
import CartContextData from './context/cart-context';
import SearchContextData from './context/search-context';
import CloudinaryContextData from './context/cloudinary-context';
import DashBoardContextData from './context/dashboard-context';
import DeletionContextData from './context/delete-context';

// Pages
import ProductListing from './pages/productListing';
import ProductDetails from './pages/productDetails';
import ProductsBySuppliers from './pages/productsBySuppliers';
import SupplierLogin from './pages/supplierLogin';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import SearchResults from './pages/searchResults';
import ProductDetailsForDashBoard from './pages/productDetailsForSuppliers';
import LoginForCart from './pages/loginForCart';
import SuccessPage from './pages/success';

// Components
import NavBar from './components/navbar';
import Footer from './components/footer';
import UpdateProductForm from './components/updateProduct';

function App() {

  return (
    <>
      <SupplierContextData>
        <CloudinaryContextData>
            <CartContextData>
              <DashBoardContextData>
                <SearchContextData>
                  <DeletionContextData>
                    <NavBar />
                      <Routes>
                        <Route path="/" element={<ProductListing />} />
                        <Route path="/products/:productId" element={<ProductDetails />} />
                        <Route path="/products/suppliers/:supplierId" element={<ProductsBySuppliers />} />
                        <Route path="/suppliers/login" element={<SupplierLogin />} />
                        <Route path="/suppliers/login/addCart" element={<LoginForCart />} />
                        <Route path="/suppliers/register" element={<Register />} />
                        <Route path="/suppliers/dashboard/:supplierId" element={<Dashboard />} />
                        <Route path="/search-results" element={<SearchResults />} />
                        <Route path="/suppliers/:productId/products/" element={<ProductDetailsForDashBoard />} />
                        <Route path="/suppliers/:productId/update" element={<UpdateProductForm />} />
                        <Route path="/paymentsuccess" element={<SuccessPage />} />
                      </Routes>
                    <Footer />
                  </DeletionContextData>
                </SearchContextData>
              </DashBoardContextData>
            </CartContextData>            
        </CloudinaryContextData>
      </SupplierContextData>
    </>
  );
}


export default App;
