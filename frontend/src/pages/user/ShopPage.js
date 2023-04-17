import React, { useEffect, useState } from "react";
import Fragment from "../../components/Fragment";
import { findAllProduk } from "../../services/ProdukService";
import { Link } from "react-router-dom";
import { APP_BASE_URL } from "../../configs/constants";

const ShopPage = () => {
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

  const newProduk = produks.reverse();

  return (
    <Fragment>
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
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

      <section id="pagination" className="section-p1">
        <a href="#">1</a>
        <a href="#">2</a>
        <a href="#">
          <i className="fas fa-arrow-right"></i>
        </a>
      </section>
    </Fragment>
  );
};

export default ShopPage;
