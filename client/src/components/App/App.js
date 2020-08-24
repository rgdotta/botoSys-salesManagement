import React from "react";

import TopicMenu from "../Menus/TopicMenu";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ShowProducts from "../Products/Show/ShowProducts";
import CreateProduct from "../Products/Create/CreateProduct";

import { Layout } from "antd";
import "./App.css";

import NavBar from "../Menus/Navbar/Navbar";
import SideBar from "../Menus/Sidebar/Sidebar";

const App = () => {
  const topics = [
    {
      name: "Vendas",
      icon: 0,
      options: [
        { name: "Registrar", route: "/products/create" },
        { name: "Consultar", route: "/products/show" },
        { name: "Montagem", route: "z" },
      ],
    },
  ];

  const Menu = <TopicMenu topics={topics} />;

  return (
    <div className="App">
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <div>
            <NavBar menu={Menu} />

            <SideBar menu={Menu} />
            <Layout.Content className="content">{topics.name}</Layout.Content>
          </div>
          <div>
            <Layout className="site-layout">
              <Switch>
                <div className="products">
                  <Route path="/products/create">
                    <CreateProduct />
                  </Route>
                  <Route path="/products/show">
                    <ShowProducts />
                  </Route>
                </div>
              </Switch>
            </Layout>
          </div>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
