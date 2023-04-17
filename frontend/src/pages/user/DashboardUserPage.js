import React, { useEffect, useState } from "react";
import Fragment from "../../components/Fragment";
import { findAllProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import { APP_BASE_URL } from "../../configs/constants";

const DashboardUserPage = () => {
  const [produks, setProduks] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await findAllProduk();
        setProduks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    load();
  }, []);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImage = async (gambar) => {
    const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    return imageObjectURL;
  };

  const ImageProduk = ({ row }) => {
    const [imageSrc, setImageSrc] = useState("");
    useEffect(() => {
      const loadImage = async () => {
        const imageSrc = await fetchImage(row.gambar);
        setImageSrc(imageSrc);
      };
      loadImage();
    }, [row.gambar]);

    if (!imageSrc) {
      return <img src={process.env.PUBLIC_URL + "/images/none.jpg"} alt={row.nama} />;
    }

    return <img src={imageSrc} alt={row.nama} />;
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const detailProduk = (row) => {
    return (
      <Link to={`/sproduct/${row.id}`}>
        <i className="fas fa-cart-plus cart"></i>
      </Link>
    );
  };

  const newProduk = produks.slice(-8).reverse();

  const randomProduk = produks.sort(() => Math.random() - 0.5).slice(0, 8);

  return (
    <Fragment>
      <section id="hero">
        <h4>Trade-in-offer</h4>
        <h2>Super value deals</h2>
        <h1>On all products</h1>
        <p>Save more with coupons & up to 70% off!</p>
        <Link to="/shop">
          <button>Shop Now</button>
        </Link>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Morden Design</p>
        <div className="pro-container">
          {randomProduk.map((produk) => (
            <div className="pro" key={produk.id}>
              <ImageProduk row={produk} />
              {/* <img src={img[produk.gambar] || process.env.PUBLIC_URL + "/images/none.jpg"} alt={`Produk ${produk.nama}`} onLoad={() => fetchImage(produk.gambar)} /> */}
              <div className="des">
                <span>{produk.kategori.nama}</span>
                <h5>{produk.nama}</h5>
                <div className="star">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4>{formatRupiah(produk.harga)}</h4>
              </div>
              {detailProduk(produk)}
            </div>
          ))}
        </div>
      </section>

      <section id="banner" className="section-m1">
        <h4>Repair Services</h4>
        <h2>
          Up to <span>70% off</span> - All t-shirts & Accessories
        </h2>
        <button className="normal">Explore More</button>
      </section>

      <section id="product1" className="section-p1">
        <h2>Featured Products</h2>
        <p>Summer Collection New Morden Design</p>
        <div className="pro-container">
          {newProduk.map((produk) => (
            <div className="pro" key={produk.id}>
              <ImageProduk row={produk} />
              <div className="des">
                <span>{produk.kategori.nama}</span>
                <h5>{produk.nama}</h5>
                <div className="star">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div>
                <h4>{formatRupiah(produk.harga)}</h4>
              </div>
              {detailProduk(produk)}
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

export default DashboardUserPage;
