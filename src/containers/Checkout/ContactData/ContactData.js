import React, { useState } from "react";
import {connect} from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from '../../../shared/utility';

const ContactData = props => {
  const [orderForm,setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        expLength: 6,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-mail",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },

    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  });
  const [formIsValid,setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();
    
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] =
        orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ings,
      price: props.price,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order,props.token);
    
  };

  const inputChangedHandler = (event, inputIndetifier) => {
    //console.log(event.target.value);
    const updatedFormElement = updateObject(orderForm[inputIndetifier],{
      value:event.target.value,
      valid:checkValidity(
        event.target.value,
        orderForm[inputIndetifier].validation
      ),
      touched:true,
    });
    const updatedOrderForm = updateObject(orderForm,{
      [inputIndetifier]:updatedFormElement
    })
    
    let formIsValid = true;
    for (let inputIndetifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIndetifier].valid && formIsValid;
    }
    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({ id: key, config: orderForm[key] });
    }
    let form = (
      <form onSubmit={orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              changed={(event) =>
                inputChangedHandler(event, formElement.id)
              }
            />
          );
        })}
        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter Your Contact Data</h4>
        {form}
      </div>
    );
}

const mapStateToProps = state => {
  return {
    ings:state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading,
    token:state.auth.token,
    userId:state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger : (orderData,token) => dispatch(actions.purchaseBurger(orderData,token)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));
