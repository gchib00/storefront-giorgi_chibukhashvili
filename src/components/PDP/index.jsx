/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import withRouter from '../HigherOrderComponents/withRouter';
import ProductDetails from './ProductDetails';
import SideImages from './SideImages';
import MainImage from './MainImage';

const MainContainer = styled.main`
    width: 80%;
    margin: auto;
    margin-top: 3rem;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    text-align: center;
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

class PDP extends PureComponent {
  render() {
    const { id } = this.props.params;
    return (
      <Query query={FETCH_PRODUCT} variables={{ id }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          console.log(data);
          return (
            <MainContainer>
              <MainImage image={data.product.gallery[0]} />
              <SideImages images={data.product.gallery} />
              <ProductDetails product={data.product} />
            </MainContainer>
          );
        }}
      </Query>
    );
  }
}
export default withRouter(PDP);
