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
import CustomerContextData from './context/customer-context';

// Pages
import ProductListing from './pages/productListing';
import ProductDetails from './pages/productDetails';
import ProductsBySuppliers from  './pages/productsBySupplier';
import SupplierLogin from './pages/supplierLogin';
import Register from './pages/register';
import Dashboard from './pages/dashboard';
import SearchResults from './pages/searchResults';
import ProductDetailsForDashBoard from './pages/productDetailsForSuppliers';
import LoginForCart from './pages/loginForCart';
import SuccessPage from './pages/success';
import CustomerLogin from './pages/customerLogin';
import DashboardForCustomers from './pages/dashboardForCustomers';
import RegisterForCustomers from './pages/registerForCustomers'

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
                    <CustomerContextData>
                    <NavBar />
                      <Routes>
                        <Route path="/" element={<ProductListing />} />
                        <Route path="/products/:productId" element={<ProductDetails />} />
                        <Route path="/products/suppliers/:supplierId" element={<ProductsBySuppliers />} />
                        <Route path="/suppliers/login" element={<SupplierLogin />} />
                        <Route path="/customers/login" element={<CustomerLogin/>}/>
                        <Route path="/suppliers/login/addCart" element={<LoginForCart />} />
                        <Route path="/suppliers/register" element={<Register />} />
                        <Route path="/customers/register" element={<RegisterForCustomers/>} />
                        <Route path="/suppliers/dashboard/:supplierId" element={<Dashboard />} />
                        <Route path="/customers/dashboard/:customerId" element={<DashboardForCustomers/>}/>
                        <Route path="/search-results" element={<SearchResults />} />
                        <Route path="/suppliers/:product_id/products/" element={<ProductDetailsForDashBoard />} />
                        <Route path="/suppliers/:productId/update" element={<UpdateProductForm />} />
                        <Route path="/paymentsuccess" element={<SuccessPage />} />
                      </Routes>
                    <Footer />
                    </CustomerContextData>
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
