//    console.log(prices);
//     console.log(allPrices);import React, { useState, useEffect } from "react";

//     import { getApi } from "../../../../bin/callApi";
//     import NumberFormat from "react-number-format";

//     import OrderFormItem from "./OrderFormItem";

//     import { Table, Select, Button } from "antd";
//     import CloseOutlined from "@ant-design/icons/CloseOutlined";

//     import "../Order.css";

//     const OrderTable = ({ order, change }) => {
//       const [productList, setProductList] = useState();
//       const [product, setProduct] = useState();
//       const [selectedProducts, setSelectedProducts] = useState([]);
//       const [tableSource, setTableSource] = useState([]);
//       const [allPrices, setAllPrices] = useState([]);

//       const handleChange = (value) => {
//         const prod = productList.filter((product) => {
//           return value === product._id;
//         });

//         setProduct(prod[0]);
//       };

//       //change price from within the table
//       const handlePrice = (value, index) => {
//         console.log(index);
//         const prices = [...allPrices];
//         console.log(prices);
//         console.log(allPrices);
//         prices[index] = value;
//         console.log(prices);
//         console.log(allPrices);
//         console.log(prices);

//         setAllPrices(prices);
//         change("pricePerProduct", prices);

//         const sum = prices.reduce((a, b) => a + b, 0);
//         const applyDiscount = sum - (sum * order.discount) / 100;

//         change("totalValue", sum);
//         change("finalValue", applyDiscount);
//       };

//       //delete from selected products
//       const handleDelete = (index) => {
//         console.log(index);
//         // const index = [...tableSource].indexOf(() => return x)

//         const reducedSelection = [...selectedProducts];
//         reducedSelection.splice(index, 1);

//         const reducedSource = [...tableSource];
//         reducedSource.splice(index, 1);

//         const reducedIds = reducedSelection.map((product) => {
//           return product._id;
//         });

//         const prices = [...order.pricePerProduct];
//         prices.splice(index, 1);

//         const sum = prices.reduce((a, b) => a + b, 0);
//         const applyDiscount = sum - (sum * order.discount) / 100;

//         setTableSource(reducedSource);
//         setSelectedProducts(reducedSelection);
//         change("products", reducedIds);
//         change("totalValue", sum);
//         change("finalValue", applyDiscount);
//       };

//       const handleClick = () => {
//         if (product) {
//           const index = selectedProducts.length;
//           const selected = [...selectedProducts, product];
//           const ids = selected.map((product) => {
//             return product._id;
//           });

//           setSelectedProducts(selected);
//           change("products", ids);

//           const prices = [...allPrices];
//           prices[index] = 0;

//           setAllPrices(prices);
//           // change(index, 0, "pricePerProduct");

//           const source = [
//             ...tableSource,
//             {
//               key: index,
//               name: product.name,
//               code: product.code.join(", "),
//               psv: new Intl.NumberFormat("pt-BR", {
//                 style: "currency",
//                 currency: "BRL",
//               }).format(product.psv.$numberDecimal),
//               pricePerProduct: (
//                 <NumberFormat
//                   className="formaterInput"
//                   thousandSeparator="."
//                   prefix={"R$"}
//                   decimalScale={2}
//                   decimalSeparator=","
//                   pagination="none"
//                   value={allPrices[index]}
//                   onValueChange={(value) => handlePrice(value.floatValue, index)}
//                 />
//               ),
//               delete: (
//                 <button className="deleteBtn" onClick={() => handleDelete(index)}>
//                   <CloseOutlined />
//                 </button>
//               ),
//             },
//           ];

//           setTableSource(source);
//         }
//       };

//       useEffect(() => {
//         getApi("products").then((data) => setProductList(data));
//       }, []);

//       const columns = [
//         {
//           title: "Nome",
//           dataIndex: "name",
//           key: "name",
//         },
//         {
//           title: "Código",
//           dataIndex: "code",
//           key: "code",
//         },
//         {
//           title: "PSV",
//           dataIndex: "psv",
//           key: "psv",
//         },
//         {
//           title: "Preço",
//           dataIndex: "pricePerProduct",
//           key: "pricePerProduct",
//         },
//         { title: "Deletar", dataIndex: "delete", key: "delete" },
//       ];

//       const fieldSelection = ["totalValue", "discount", "finalValue"];

//       console.log(tableSource);

//       return (
//         <div>
//           <div className="selectionContainer">
//             <Select
//               style={{ width: "250px" }}
//               defaultValue="default"
//               id="Select2"
//               onChange={(value) => handleChange(value)}
//               showSearch
//               optionFilterProp="children"
//               filterOption={(input, option) =>
//                 option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//               }
//             >
//               <Select.Option disabled value="default">
//                 Selecione o produto
//               </Select.Option>
//               {productList &&
//                 productList.map((product, index) => {
//                   return (
//                     <Select.Option key={index} value={product._id}>
//                       {product.name}
//                     </Select.Option>
//                   );
//                 })}
//             </Select>
//             <Button
//               className="btn"
//               size="default"
//               type="primary"
//               onClick={handleClick}
//             >
//               Adicionar
//             </Button>
//           </div>
//           <div className="orderTableContainer">
//             <Table
//               className="orderTable"
//               columns={columns}
//               dataSource={tableSource}
//             />
//           </div>

//           {Object.entries(order).map((property, index) => {
//             return (
//               <OrderFormItem
//                 key={index}
//                 selection={fieldSelection}
//                 property={property}
//                 change={change}
//                 order={order}
//               />
//             );
//           })}
//         </div>
//       );
//     };

//     export default OrderTable;
