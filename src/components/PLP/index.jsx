import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import Product from './Product';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  grid-template-rows: 1fr;
  font-family: 'Raleway', sans-serif;
`;
// const Title = styled.h1`
//   font-family: 'Raleway';
//   font-style: normal;
//   font-weight: normal;
//   font-size: 37px;
//   margin-left: 4rem;
// `;
const FETCH_PRODUCTS = gql`
  query($selectedCategory: String!){ 
    category(input: {title: $selectedCategory}){
      products{
        id,
        inStock,
        name,
        prices{
          amount,
          currency {
            label,
            symbol
          }
        }
        gallery,
        description,
        category,
        attributes{
          items{
            id,
            value
          }
          id,
          name,
          type,
        }
      }
    }
  }
`;
class PLP extends PureComponent {
  // eslint-disable-next-line class-methods-use-this
  renderProducts = (data) => {
    return (
      data.category.products.map((product) => {
        return <p>{product.name}</p>;
      })
    );
  };

  render() {
    let { selectedCategory } = this.props;
    selectedCategory = selectedCategory.toLowerCase();
    console.log('render');
    // eslint-disable-next-line arrow-body-style
    return (
      <Query query={FETCH_PRODUCTS} variables={{ selectedCategory }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <ProductsGrid>
              {this.renderProducts(data)}
            </ProductsGrid>
          );
        }}
      </Query>
    );
  }
}
PLP.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCategory: state.selectedCategory,
});
export default connect(mapStateToProps)(PLP);
// {/* <Title>{this.displayTitle()}</Title> */}
// {/* <ProductsGrid>{this.renderProducts()}</ProductsGrid> */}
