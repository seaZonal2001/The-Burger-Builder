import React from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

const OrderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "capitalize" }}>{igKey}</span>:{" "}
            {props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious Burger with the following ingredients</p>
        <ul>{ingredientsSummary}</ul>
        <p>
          <strong>Total Price: {props.price.toFixed(2)}</strong>
        </p>
        <p>Continue to Checkout?</p>
        <Button btnType={"Danger"} clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btnType={"Success"} clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxiliary>
    );
}

export default OrderSummary;
