import React, { useEffect, useState } from "react";
import Fragment from "../../components/Fragment";
import { useNavigate, useParams } from "react-router-dom";
import { findProdukById } from "../../services/ProdukService";
import { APP_BASE_URL } from "../../configs/constants";
import { createKeranjang } from "../../services/KeranjangService";

const SProductPage = () => {
  const [img, setImg] = useState({});
  const [produk, setProduk] = useState([]);
  const [kuantitas, setKuantitas] = useState(1);
  const Navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const loadProduk = async () => {
      try {
        const response = await findProdukById(id);
        const _produk = response.data;
        setProduk(_produk);
        if (_produk.gambar) {
          fetchImage(_produk.gambar);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadProduk();
    // eslint-disable-next-line
  }, [id]);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchImage = async (gambar) => {
    const res = await fetch(`${APP_BASE_URL}/api/images/${gambar}`, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
  }

  const onJumlahChange = (event) => {
    setKuantitas(event.target.value);
  };

  const onAddToCartClick = async () => {
    const keranjang = {
      produkId: produk.id,
      kuantitas: kuantitas,
    };

    try {
      await createKeranjang(keranjang);
      Navigate("/cart", {
        replace: true,
      });
      alert("Berhasil menambahkan produk ke keranjang!");
    } catch (error) {
      console.error(error);
      alert("Gagal menambahkan produk ke keranjang.");
    }
  };

  return (
    <Fragment>
      <section>
        <div id="prodetails" className="section-p1">
          <div className="single-pro-image">
            <img src={img || process.env.PUBLIC_URL + "/images/none.jpg"} width="100%" id="MainImg" alt={`Produk ${produk.nama}`} />
            <div className="small-img-group"></div>
          </div>

          <div className="single-pro-details">
            <h6>{`Home / ${produk.nama}`}</h6>
            <h4>{`${produk.nama}`}</h4>
            <h2>{formatRupiah(`${produk.harga}`)}</h2>
            {/* <select name="" id="">
              <option value="">Select Size</option>
              <option value="">XL</option>
              <option value="">XXL</option>
              <option value="">Small</option>
              <option value="">Large</option>
            </select> */}
            <input type="number" min={1} max={`${produk.stok}`} value={kuantitas} onChange={onJumlahChange} />
            <button className="normal" onClick={onAddToCartClick}>
              Add To Cart
            </button>
            <h5>Stok : {`${produk.stok}`}</h5>
          </div>
        </div>
        <div className="single-pro-des">
          <h3>Deskripsi Produk</h3>
          <span>{`${produk.deskripsi}`}</span>
        </div>
      </section>
    </Fragment>
  );
};

export default SProductPage;
