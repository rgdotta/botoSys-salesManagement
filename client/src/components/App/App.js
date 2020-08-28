import React from "react";

import TopicMenu from "../Menus/TopicMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowProducts from "../Products/Show/ShowProducts";
import CreateProduct from "../Products/Create-Edit/CreateProduct";
import EditProduct from "../Products/Create-Edit/EditProduct";

import { Layout } from "antd";
import "./App.css";

import SideBar from "../Menus/Sidebar/Sidebar";

const App = () => {
  const topics = [
    {
      name: "Vendas",
      icon: 0,
      options: [
        { name: "Cadastrar", route: "/sales/create" },
        { name: "Consultar", route: "/sales/show" },
        { name: "Montagem", route: "/sales/order" },
      ],
    },
    {
      name: "Produtos",
      icon: 1,
      options: [
        { name: "Cadastrar", route: "/products/create" },
        { name: "Catalogo", route: "/products/show" },
      ],
    },
    {
      name: "Clientes",
      icon: 2,
      options: [
        { name: "Cadastrar", route: "/clients/create" },
        { name: "Lista", route: "/clients/show" },
      ],
    },
  ];

  const Menu = <TopicMenu topics={topics} />;

  return (
    <div className="App">
      <Router>
        <Layout style={{ minHeight: "100vh", width: "100%" }}>
          <div>
            <SideBar menu={Menu} />
            <Layout.Content className="content">{topics.name}</Layout.Content>
          </div>
          <div className="siteContainer">
            <Layout className="siteLayout">
              <Switch>
                {/* product routes */}
                <Route path="/products/create" component={CreateProduct} />
                <Route path="/products/edit/:product" component={EditProduct} />
                <Route path="/products/show" component={ShowProducts} />
              </Switch>
            </Layout>
          </div>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
