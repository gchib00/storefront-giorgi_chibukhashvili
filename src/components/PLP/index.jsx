import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import PropTypes from 'prop-types';
import withRouter from '../HigherOrderComponents';
import ProductCard from './ProductCard';
import CategoryTitle from './CategoryTitle';
import FilterButton from './FilterButton';
import FilterSiderbar from './FilterSidebar';

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
        category,
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
  }
`;
class PLP extends PureComponent {
  state = {
    showFilterSidebar: false,
  };

  setFilterSlidebar = (bool) => {
    this.setState((prevState) => ({
      ...prevState,
      showFilterSidebar: bool,
    }));
  };

  renderProducts = (data) => {
    return (
      data.category.products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })
    );
  };

  render() {
    const { category } = this.props.params;
    return (
      <Query query={FETCH_PRODUCTS} variables={{ selectedCategory: category }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          return (
            <>
              <CategoryTitle />
              <FilterButton
                setFilterSlidebar={this.setFilterSlidebar}
              />
              {this.state.showFilterSidebar ? (
                <FilterSiderbar
                  showFilterSidebar={this.state.showFilterSidebar}
                  setFilterSlidebar={this.setFilterSlidebar}
                />
              ) : null}
              <ProductsGrid>
                {this.renderProducts(data)}
              </ProductsGrid>
            </>
          );
        }}
      </Query>
    );
  }
}
PLP.propTypes = {
  params: PropTypes.object,
};
export default withRouter(PLP);
