import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProductCard from './ProductCard';

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  grid-template-rows: 1fr;
  font-family: 'Raleway', sans-serif;
`;
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
        category
      }
    }
  }
`;
class PLP extends PureComponent {
  renderProducts = (data) => {
    return (
      data.category.products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })
    );
  };

  render() {
    let { selectedCategory } = this.props;
    selectedCategory = selectedCategory.toLowerCase();
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
