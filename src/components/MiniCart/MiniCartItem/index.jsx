import React, { PureComponent } from 'react';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ItemInfo from './ItemInfo';
import QuantityModifier from './QuantityModifier';
import ItemImage from './ItemImage';

const MainContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;
    width: 98%;
    min-height: 140px;
    align-items: center;
`;
const SecondaryContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    min-height: 137px;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
`;
const FETCH_PRODUCT = gql`
  query($id: String!){ 
    product(id: $id){
      id,
      name,
      gallery,
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
export default class MiniCartItem extends PureComponent {
  render() {
    const { productID, quantity } = this.props;
    return (
      <Query query={FETCH_PRODUCT} variables={{ id: productID }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <MainContainer>
              <ItemInfo
                name={data.product.name}
                prices={data.product.prices}
              />
              <SecondaryContainer>
                <QuantityModifier
                  quantity={quantity}
                />
                <ItemImage
                  image={data.product.gallery[0]}
                />
              </SecondaryContainer>
            </MainContainer>
          );
        }}
      </Query>
    );
  }
}
MiniCartItem.propTypes = {
  productID: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
};
