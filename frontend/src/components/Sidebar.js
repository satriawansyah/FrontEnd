import React from "react";

import { Link } from "react-router-dom";
import { Menu } from "primereact/menu";
import { useAuth } from "../auth/useAuth";

const Sidebar = () => {
  const { signout, user } = useAuth();

  // user
  // const userMenus = [
  //   {
  //     label: "Profile",
  //     icon: "pi pi-user",
  //     template: (item, options) => {
  //       return (
  //         <Link to="/profile" className={options.className}>
  //           <span className={options.iconClassName}></span>
  //           <span className={options.labelClassName}>{item.label}</span>
  //         </Link>
  //       );
  //     },
  //   },
  //   {
  //     label: "Pesanan",
  //     icon: "pi pi-shopping-cart",
  //     template: (item, options) => {
  //       return (
  //         <Link to="/pesanan" className={options.className}>
  //           <span className={options.iconClassName}></span>
  //           <span className={options.labelClassName}>{item.label}</span>
  //         </Link>
  //       );
  //     },
  //   },
  //   {
  //     label: "Riwayat",
  //     icon: "pi pi-history",
  //     template: (item, options) => {
  //       return (
  //         <Link to="/pesanan/riwayat" className={options.className}>
  //           <span className={options.iconClassName}></span>
  //           <span className={options.labelClassName}>{item.label}</span>
  //         </Link>
  //       );
  //     },
  //   },
  //   {
  //     label: "Sign Out",
  //     icon: "pi pi-sign-out",
  //     command: () => signout(),
  //   },
  // ];

  // users
  const userMenus = [
    {
      label: "Dashboard",
      icon: "pi pi-th-large",
      template: (item, options) => {
        return (
          <Link to="/user/dashboard" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label} </span>
          </Link>
        );
      },
    },
    {
      label: "Keranjang",
      icon: "pi pi-shopping-cart",
      template: (item, options) => {
        return (
          <Link to="/user/keranjang" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label} </span>
          </Link>
        );
      },
    },

    {
      label: "Pesanan",
      icon: "pi pi-truck",
      template: (item, options) => {
        return (
          <Link to="/user/pesanan" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label} </span>
          </Link>
        );
      },
    },

    {
      label: "Riwayat",
      icon: "pi pi-history",
      template: (item, options) => {
        return (
          <Link to="/user/riwayat" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label} </span>
          </Link>
        );
      },
    },

    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => signout(),
    },
  ];

  const adminMenus = [
    {
      label: "Dashboard",
      icon: "pi pi-th-large",
      template: (item, options) => {
        return (
          <Link to="/admin/dashboard" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Pesanan",
      icon: "pi pi-shopping-cart",
      template: (item, options) => {
        return (
          <Link to="/admin/pesanan" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Riwayat",
      icon: "pi pi-history",
      template: (item, options) => {
        return (
          <Link to="/admin/pesanan/riwayat" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Kategori",
      icon: "pi pi-tags",
      template: (item, options) => {
        return (
          <Link to="/admin/kategori" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Ekspedisi",
      icon: "pi pi-tags",
      template: (item, options) => {
        return (
          <Link to="/admin/ekspedisi" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Produk",
      icon: "pi pi-box",
      template: (item, options) => {
        return (
          <Link to="/admin/produk" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },

    {
      label: "Pengguna",
      icon: "pi pi-users",
      template: (item, options) => {
        return (
          <Link to="/admin/pengguna" className={options.className}>
            <span className={options.iconClassName}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: () => signout(),
    },
  ];

  return (
    <div className="sidebar">
      <h3>Sidebar</h3>
      <Menu model={user.role === "admin" ? adminMenus : userMenus} />
    </div>
  );
};

export default Sidebar;
