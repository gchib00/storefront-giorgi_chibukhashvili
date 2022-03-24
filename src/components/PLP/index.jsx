/* eslint-disable no-plusplus */
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
        brand,
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
const renderProducts = (filteredData) => (
  filteredData.map((product) => <ProductCard product={product} key={product.id} />)
);
class PLP extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFilterSidebar: false,
    };
  }

  setFilterSlidebar = (bool) => {
    this.setState((prevState) => ({
      ...prevState,
      showFilterSidebar: bool,
    }));
  };

  filterList = (data) => {
    const { searchParams } = this.props;
    const filters = searchParams.getAll('attr');
    if (filters.length === 0) {
      return data;
    }
    const filteredProducts = [];
    let filterCycles = [];
    filters.map((attr) => {
      const matchingProducts = data.filter((product) => {
        let pass = false;
        if (product.attributes.length === 0) {
          return pass;
        }
        for (let i = 0; i < product.attributes.length; i++) {
          if (attr.includes('?')) {
            const attrName = attr.split('?')[0];
            const attrValue = attr.split('?')[1];
            if (product.attributes[i].name === attrName) {
              for (let ii = 0; ii < product.attributes[i].items.length; ii++) {
                if (product.attributes[i].items[ii]?.value === attrValue) {
                  pass = true;
                }
              }
            }
          } else if (attr === product.attributes[i].name) {
            pass = true;
          }
        }
        return pass;
      });
      return filterCycles.push(matchingProducts);
    });
    const cyclesCount = filterCycles.length;
    filterCycles = filterCycles.flat();
    filterCycles.map((product) => {
      const repeated = filterCycles.filter((x) => x.id === product.id).length;
      if (repeated === cyclesCount) {
        if (filteredProducts.some((product2) => product2.id === product.id)) {
          return null;
        }
        return filteredProducts.push(product);
      }
      return null;
    });
    return filteredProducts;
  };

  render() {
    const { params } = this.props;
    const { category } = params;
    const { showFilterSidebar } = this.state;
    return (
      <Query query={FETCH_PRODUCTS} variables={{ selectedCategory: category }}>
        { ({ loading, data }) => {
          if (loading) { return null; }
          const filteredData = this.filterList(data.category.products);
          const allAttributes = data.category.products.map((product) => product.attributes);
          return (
            <>
              <CategoryTitle />
              <FilterButton
                setFilterSlidebar={this.setFilterSlidebar}
              />
              {showFilterSidebar ? (
                <FilterSiderbar
                  allAttributes={allAttributes}
                  showFilterSidebar={showFilterSidebar}
                  setFilterSlidebar={this.setFilterSlidebar}
                />
              ) : null}
              <ProductsGrid>
                {renderProducts(filteredData)}
              </ProductsGrid>
            </>
          );
        }}
      </Query>
    );
  }
}
PLP.propTypes = {
  searchParams: PropTypes.objectOf(PropTypes.string).isRequired,
  // eslint-disable-next-line react/require-default-props
  params: PropTypes.objectOf(PropTypes.any),
};
export default withRouter(PLP);
