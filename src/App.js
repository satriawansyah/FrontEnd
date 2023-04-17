import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./components/ProtectedRoute";
import DashboardAdminPage from "./pages/admin/DashboardAdminPage";
import KategoriAdminPage from "./pages/admin/KategoriAdminPage";
import ProdukAdminCreatePage from "./pages/admin/ProdukAdminCreatePage";
import ProdukAdminDetailPage from "./pages/admin/ProdukAdminDetailPage";
import ProdukAdminEditPage from "./pages/admin/ProdukAdminEditPage";
import ProdukAdminListPage from "./pages/admin/ProdukAdminListPage";
import PesananAdminPage from "./pages/admin/PesananAdminPage";
import PesananDetailAdminPage from "./pages/admin/PesananDetailAdminPage";
import RiwayatPesananAdminPage from "./pages/admin/RiwayatPesananAdminPage";
import PenggunaAdminPage from "./pages/admin/PenggunaAdminPage";
import HomePage from "./pages/HomePage";
import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import Forbidden from "./components/Forbidden";
// import DashboardUserPage from "./pages/user/DashboardUserPage";
// import ShopPage from "./pages/user/ShopPage";
// import CartPage from "./pages/user/CartPage";
// import AboutPage from "./pages/user/AboutPage";
// import BlogPage from "./pages/user/BlogPage";
// import ContactPage from "./pages/user/ContactPage";
// import SProductPage from "./pages/user/SProductPage";
// import ProfilePage from "./pages/user/ProfilePage";
// import PesananUserPage from "./pages/user/PesananUserPage";
// import RiwayatPesananUserPage from "./pages/user/RiwayatPesananUserPage";
import DashboardUserPage from "./pages/users/DashboardUserPage";
import ProdukUserDetailPage from "./pages/users/ProdukUserDetailPage";
import ProdukUserKeranjangPage from "./pages/users/ProdukUserKeranjangPage";
import ProdukUserPesananPage from "./pages/users/ProdukUserPesananPage";
import ProdukPesananEditPage from "./pages/users/ProdukPesananEditPage";
import ProdukUserCheckoutPage from "./pages/users/ProdukUserCheckoutPage";
import ProdukUserRiwayatPage from "./pages/users/ProdukUserRiwayatPage";
import PesananDetailUserPage from "./pages/users/PesananDetailUserPage";
import EkspedisiAdminPage from "./pages/admin/EkspedisiAdminPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<DashboardUserPage />} /> */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forbidden" element={<Forbidden />} />

        {/* user */}
        {/* <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute userRole="user">
              <DashboardUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop"
          element={
            <ProtectedRoute userRole="user">
              <ShopPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog"
          element={
            <ProtectedRoute userRole="user">
              <BlogPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute userRole="user">
              <AboutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact"
          element={
            <ProtectedRoute userRole="user">
              <ContactPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/sproduct/:id"
          element={
            <ProtectedRoute userRole="user">
              <SProductPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute userRole="user">
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute userRole="user">
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pesanan"
          element={
            <ProtectedRoute userRole="user">
              <PesananUserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pesanan/riwayat"
          element={
            <ProtectedRoute userRole="user">
              <RiwayatPesananUserPage />
            </ProtectedRoute>
          }
        /> */}

        {/* users */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute userRole="user">
              <DashboardUserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/produk/detail/:id"
          element={
            <ProtectedRoute userRole="user">
              <ProdukUserDetailPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/produk/create"
          element={
            <ProtectedRoute userRole="user">
              <ProdukUserKeranjangPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/keranjang"
          element={
            <ProtectedRoute userRole="user">
              <ProdukUserKeranjangPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/pesanan"
          element={
            <ProtectedRoute userRole="user">
              <ProdukUserPesananPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/pesanan/detail/:id"
          element={
            <ProtectedRoute userRole="user">
              <PesananDetailUserPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/produk/edit"
          element={
            <ProtectedRoute userRole="user">
              <ProdukPesananEditPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/checkout"
          element={
            <ProtectedRoute userRole="user">
              <ProdukUserCheckoutPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="user/riwayat"
          element={
            <ProtectedRoute userRole="user">
              <ProdukUserRiwayatPage />
            </ProtectedRoute>
          }
        />

        {/* admin */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute userRole="admin">
              <DashboardAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pesanan"
          element={
            <ProtectedRoute userRole="admin">
              <PesananAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pesanan/detail/:id"
          element={
            <ProtectedRoute userRole="admin">
              <PesananDetailAdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pesanan/riwayat"
          element={
            <ProtectedRoute userRole="admin">
              <RiwayatPesananAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/kategori"
          element={
            <ProtectedRoute userRole="admin">
              <KategoriAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/ekspedisi"
          element={
            <ProtectedRoute userRole="admin">
              <EkspedisiAdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produk"
          element={
            <ProtectedRoute userRole="admin">
              <ProdukAdminListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produk/create"
          element={
            <ProtectedRoute userRole="admin">
              <ProdukAdminCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produk/detail/:id"
          element={
            <ProtectedRoute userRole="admin">
              <ProdukAdminDetailPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/produk/edit/:id"
          element={
            <ProtectedRoute userRole="admin">
              <ProdukAdminEditPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/pengguna"
          element={
            <ProtectedRoute userRole="admin">
              <PenggunaAdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
