/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import ProductTitle from './ProductTitle';
import ProductPrice from './ProductPrice';
import QuantityModifier from './QuantityModifier';
import ImageSlider from './ImageSlider';

const MainContainer = styled.div`
  font-family: 'Raleway', sans-serif;
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  min-height: 186px;
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
    }
  }
`;
export default class CartItem extends Component {
  render() {
    const { cartItem } = this.props;
    return (
      <Query query={FETCH_PRODUCT} variables={{ id: cartItem.productID }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <MainContainer>
              <FirstDiv>
                <ProductTitle productName={data.product.name} />
                <ProductPrice prices={data.product.prices} />
                <br />
                <p>product attributes</p>
              </FirstDiv>
              <SecondDiv>
                <QuantityModifier
                  quantity={cartItem.quantity}
                  uniqueItemID={cartItem.uniqueItemID}
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
  cartItem: PropTypes.object.isRequired,
};
