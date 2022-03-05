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
  min-height: 137px;
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
      },
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
export default class MiniCartItem extends PureComponent {
  render() {
    const { productID, uniqueItemID, quantity, selectedAttributes } = this.props;
    return (
      <Query query={FETCH_PRODUCT} variables={{ id: productID }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <MainContainer>
              <ItemInfo
                product={data.product}
                uniqueItemID={uniqueItemID}
                quantity={quantity}
                selectedAttributes={selectedAttributes}
              />
              <SecondaryContainer>
                <QuantityModifier
                  quantity={quantity}
                  uniqueItemID={uniqueItemID}
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
  uniqueItemID: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  selectedAttributes: PropTypes.array.isRequired,
};
