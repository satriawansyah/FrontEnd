import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Fragment from "../../components/Fragment";
import { APP_BASE_URL } from "../../configs/constants";
import { deleteKeranjangById, findKeranjangByPenggunaId } from "../../services/KeranjangService";
import { createPesanan } from "../../services/PesananService";

const CartPage = () => {
  const [keranjangs, setKeranjangs] = useState([]);
  const [totalHarga, setTotalHarga] = useState(0);
  const [alamat, setAlamat] = useState("");
  const [refresh, setRefresh] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findKeranjangByPenggunaId(user);
        const data = response.data;
        setKeranjangs(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user, refresh]);

  useEffect(() => {
    let total = 0;
    keranjangs.forEach((keranjang) => {
      total += keranjang.jumlah;
    });
    setTotalHarga(total);
  }, [keranjangs]);

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
        const imageSrc = await fetchImage(row.produk.gambar);
        setImageSrc(imageSrc);
      };
      loadImage();
    }, [row.produk.gambar]);

    if (!imageSrc) {
      return <img src={process.env.PUBLIC_URL + "/images/none.jpg"} alt={row.produk.nama} />;
    }

    return <img src={imageSrc} alt={row.produk.nama} />;
  };

  function formatRupiah(amount) {
    return amount.toLocaleString("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  const onALamatChange = (event) => {
    setAlamat(event.target.value);
  };

  const pesanProduk = async () => {
    if (keranjangs.length === 0) {
      // cek keranjang kosong
      alert("Keranjang belanja masih kosong");
      return;
    }

    const pesananRequest = {
      ongkir: 0,
      alamatPengiriman: alamat,
      items: keranjangs.map((keranjang) => ({
        produkId: keranjang.produk.id,
        kuantitas: keranjang.kuantitas,
      })),
    };
    try {
      await createPesanan(pesananRequest);
      alert("Berhasil memesan produk");
      setRefresh(!refresh);
      navigate("/pesanan", {
        replace: true,
      });
    } catch (error) {
      console.error(error);
      alert("Gagal memesan produk");
    }
  };

  return (
    <Fragment>
      <section id="page-header">
        <h2>#stayhome</h2>
        <p>Save more with coupons & up to 70% off!</p>
      </section>

      {/* <div > */}
      <section id="cart" className="section-p1">
        <table width="100%">
          <thead>
            <tr>
              <td>Action</td>
              {/* <td>ProdukId</td> */}
              <td>Gambar</td>
              <td>Produk</td>
              <td>Harga</td>
              <td>Kuantitas</td>
              <td>Total Harga</td>
            </tr>
          </thead>
          <tbody>
            {keranjangs.map((keranjang) => (
              <tr key={keranjang.id}>
                <td>
                  <Link onClick={() => deleteKeranjangById(keranjang.produk.id)}>
                    <i className="fas fa-times"></i>
                  </Link>
                  <Link to={`/sproduct/${keranjang.produk.id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </td>
                <td>{/* <ImageProduk row={keranjang} /> */}</td>
                <td>{keranjang.produk.nama}</td>
                <td>{formatRupiah(keranjang.harga)}</td>
                <td>{keranjang.kuantitas}</td>
                <td>{formatRupiah(keranjang.jumlah)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section id="cart-add" className="section-p1">
        <div id="coupon">
          <h3>Data Pengiriman</h3>
          <div>
            <input type="text" placeholder="Masukkan Alamat Pengiriman" value={alamat} onChange={onALamatChange} />
          </div>
        </div>

        <div id="subtotal">
          <h3>Total Pesanan</h3>
          <table>
            <tr>
              <td>Total Pesanan</td>
              <td>{formatRupiah(totalHarga)}</td>
            </tr>
            <tr>
              <td>Ongkir</td>
              <td>0</td>
            </tr>
            <tr>
              <td>
                <strong>Total</strong>
              </td>
              <td>
                <strong>{formatRupiah(totalHarga)}</strong>
              </td>
            </tr>
          </table>
          {/* <Link to={"/pesanan"}> */}
          <button className="normal" onClick={pesanProduk}>
            Checkout
          </button>
          {/* </Link> */}
        </div>
      </section>
      {/* </div> */}
    </Fragment>
  );
};

export default CartPage;
