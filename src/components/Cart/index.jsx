import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CartTitle from './CartTitle';
import CartItem from './CartItem';

class CartPage extends PureComponent {
  render() {
    const { cartItems } = this.props;
    return (
      <>
        <CartTitle />
        {cartItems.map((cartItem) => {
          return (
            <CartItem
              productID={cartItem.productID}
              quantity={cartItem.quantity}
              uniqueItemID={cartItem.uniqueItemID}
              selectedAttributes={cartItem.selectedAttributes}
              key={cartItem.uniqueItemID}
            />
          );
        })}
      </>
    );
  }
}
CartPage.propTypes = {
  cartItems: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => ({
  cartItems: state.cartItems,
});
export default connect(mapStateToProps)(CartPage);
