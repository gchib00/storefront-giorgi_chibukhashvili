import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import { connect } from 'react-redux';
import { updateCartItemOption } from '../../../store/actions';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import QuantityModifier from './QuantityModifier';
import ImageSlider from './ImageSlider';
import ProductAttributes from '../../PDP/ProductAttributes';

const MainContainer = styled.div`
  font-family: 'Raleway', sans-serif;
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  min-height: 196px;
  border-top: 1px solid #E5E5E5;
  margin-left: 3rem;
  margin-bottom: 1rem;
  align-items: center;
`;
const FirstDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 1rem;
`;
const SecondDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 1rem;
`;
const FETCH_PRODUCT = gql`
  query($id: String!){
    product(id: $id){
      id,
      name,
      brand,
      inStock,
      gallery,
      description,
      prices {
        amount,
        currency {
          label,
          symbol 
        }
      }
      attributes {
        name,
        type,
        items {
          displayValue,
          value,
          id
        }
      }
    }
  }
`;
class CartItem extends PureComponent {
  setSelectedAttributes = (attribute) => {
    const { uniqueItemID } = this.props;
    this.props.updateCartItemOption(uniqueItemID, attribute);
  };

  render() {
    const { quantity, uniqueItemID, productID, selectedAttributes } = this.props;
    return (
      <Query query={FETCH_PRODUCT} variables={{ id: productID }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <MainContainer>
              <FirstDiv>
                <ProductTitle
                  brand={data.product.brand}
                  name={data.product.name}
                />
                <ProductPrice prices={data.product.prices} />
                <br />
                <ProductAttributes
                  product={data.product}
                  selectedAttributes={selectedAttributes}
                  setSelectedAttributes={this.setSelectedAttributes}
                />
              </FirstDiv>
              <SecondDiv>
                <QuantityModifier
                  quantity={quantity}
                  uniqueItemID={uniqueItemID}
                />
                <ImageSlider images={data.product.gallery} />
              </SecondDiv>
            </MainContainer>
          );
        }}
      </Query>
    );
  }
}
CartItem.propTypes = {
  productID: PropTypes.string.isRequired,
  uniqueItemID: PropTypes.string.isRequired,
  selectedAttributes: PropTypes.array.isRequired,
  quantity: PropTypes.number.isRequired,
  updateCartItemOption: PropTypes.func.isRequired,
};
const mapDispatchToProps = () => ({
  updateCartItemOption,
});
export default connect(null, mapDispatchToProps())(CartItem);
