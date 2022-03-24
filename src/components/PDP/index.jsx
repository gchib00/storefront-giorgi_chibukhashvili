import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import withRouter from '../HigherOrderComponents';
import ProductDetails from './ProductDetails';
import SideImages from './SideImages';
import MainImage from './MainImage';

const MainContainer = styled.main`
  width: 80%;
  margin: auto;
  margin-top: 3rem;
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
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

class PDP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      mainImgIndex: 0,
    };
  }

  changeMainImage = (newIndex) => {
    this.setState({
      mainImgIndex: newIndex,
    });
  };

  render() {
    const { mainImgIndex } = this.state;
    const { params } = this.props;
    const { id } = params;
    return (
      <Query query={FETCH_PRODUCT} variables={{ id }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <MainContainer>
              <SideImages
                images={data.product.gallery}
                changeMainImage={this.changeMainImage}
              />
              <MainImage
                image={data.product.gallery[mainImgIndex]}
                available={data.product.inStock}
              />
              <ProductDetails
                product={data.product}
              />
            </MainContainer>
          );
        }}
      </Query>
    );
  }
}
PDP.propTypes = {
  params: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default withRouter(PDP);
