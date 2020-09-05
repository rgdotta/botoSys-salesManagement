import React from "react";

import TopicMenu from "../Menus/TopicMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// product routes import
import ShowProducts from "../Products/Show/ShowProducts";
import CreateProduct from "../Products/Create-Edit/CreateProduct";
import EditProduct from "../Products/Create-Edit/EditProduct";
import Stock from "../Products/Stock/Stock";

// client routes import
import CreateClient from "../Clients/Create-Edit/CreateClient";
import ShowClients from "../Clients/Show/ShowClients";

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
        { name: "Cadastrar", route: "/produtos/criar" },
        { name: "Catalogo", route: "/produtos/catalogo" },
        { name: "Estoque", route: "/produtos/estoque" },
      ],
    },
    {
      name: "Clientes",
      icon: 2,
      options: [
        { name: "Cadastrar", route: "/clientes/criar" },
        { name: "Lista", route: "/clientes/lista" },
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
                <Route path="/produtos/criar" component={CreateProduct} />
                <Route
                  path="/produtos/editar/:produto"
                  component={EditProduct}
                />
                <Route path="/produtos/catalogo" component={ShowProducts} />
                <Route path="/produtos/estoque" component={Stock} />
                {/* client routes */}
                <Route path="/clientes/criar" component={CreateClient} />
                <Route path="/clientes/lista" component={ShowClients} />
              </Switch>
            </Layout>
          </div>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
