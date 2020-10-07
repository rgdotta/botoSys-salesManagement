import React from "react";

import TopicMenu from "../Menus/TopicMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// home route
import Home from "../Home/Home";

// product routes import
import ShowProducts from "../Products/Show/ShowProducts";
import CreateProduct from "../Products/Create-Edit/CreateProduct";
import EditProduct from "../Products/Create-Edit/EditProduct";
import Stock from "../Products/Stock/Stock";

// client routes import
import CreateClient from "../Clients/Create-Edit/CreateClient";
import EditClient from "../Clients/Create-Edit/EditClient";
import ShowClients from "../Clients/Show/ShowClients";

// order routes
import CreateOrder from "../Orders/Create-Edit/CreateOrder";
import OrderList from "../Orders/Show/OrderList";

// style && antd
import { Layout } from "antd";
import "./App.css";
import SideBar from "../Menus/Sidebar/Sidebar";

const App = () => {
  const topics = [
    {
      name: "Vendas",
      icon: 0,
      options: [
        { name: "Cadastrar", route: "/vendas/cadastrar" },
        { name: "Consultar", route: "/vendas/consultar" },
        { name: "Montagem", route: "/vendas/ordem-de-montagem" },
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

  const routes = [
    { path: "/produtos/criar", component: CreateProduct },
    { path: "/produtos/editar/:produto", component: EditProduct },
    { path: "/produtos/catalogo", component: ShowProducts },
    { path: "/produtos/estoque", component: Stock },
    { path: "/clientes/criar", component: CreateClient },
    { path: "/clientes/lista", component: ShowClients },
    { path: "/clientes/editar/:cliente", component: EditClient },
    { path: "/vendas/cadastrar", component: CreateOrder },
    { path: "/vendas/consultar", component: OrderList },
    { path: "/vendas/consultar/:venda", component: "" },
    { path: "/vendas/editar/:venda", component: "" },
    { path: "/", component: Home },
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
                {routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      component={route.component}
                    />
                  );
                })}
              </Switch>
            </Layout>
          </div>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
