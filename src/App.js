import React, { Component } from "react";
import CategoryList from "./CategoryList";
import Navi from "./Navi";
import ProductList from "./ProductList";
import { Container, Row, Col } from "reactstrap";
import alertify from "alertifyjs";
import { Route, Routes } from "react-router-dom";
import NotFound from "./NotFound";
import CartList from "./CartList";
import FormDemo1 from "./FormDemo1";
import FormDemo2 from "./FormDemo2";

export default class App extends Component {
  state = { currentCategory: "", products: [], cart: [], name: "Mahmıt" };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
  };

  getProducts = (categoryId) => {
    let url = "http://localhost:3000/products";
    if (categoryId) {
      url += "?categoryId=" + categoryId;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  addToCart = (product) => {
    let newCart = this.state.cart;
    const addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }

    this.setState({ cart: newCart });
    alertify.success(product.productName + " added to cart!");
  };

  removeFromCart = (product) => {
    let newCart = this.state.cart.filter((c) => c.product.id !== product.id);
    this.setState({ cart: newCart });
    alertify.error(product.productName + " removed from cart!", 1);
  };

  render() {
    let productInfo = { title: "Product List" };
    let categoryInfo = { title: "Category List" };

    return (
      <div>
        <Container>
          <Navi
            removeFromCart={this.removeFromCart}
            cart={this.state.cart}
            guessName={this.state.name}
          />
          <Row>
            <Col xs="3">
              <CategoryList
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <ProductList
                      products={this.state.products}
                      addToCart={this.addToCart}
                      currentCategory={this.state.currentCategory}
                      info={productInfo}
                    />
                  }
                />
                <Route
                  path="/cart"
                  element={
                    <CartList
                      cart={this.state.cart}
                      removeFromCart={this.removeFromCart}
                    />
                  }
                />

                <Route path="/form1" element={<FormDemo1 />} />
                <Route path="/form2" element={<FormDemo2 />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
