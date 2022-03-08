import React, { PureComponent } from 'react';
import { Query } from '@apollo/react-components';
import { gql } from '@apollo/client';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import withRouter from '../HigherOrderComponents';
import CategoryButton from './CategoryButton';

const MainContainer = styled.div`
  height: 100%;
  margin-left: 3rem;
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: flex-end;
`;
const GET_CATEGORIES = gql`
  query{ 
    categories {
      name
    }
  }
`;
class Categories extends PureComponent {
  state = {
    selectedCategory: 'all',
  };

  handleCategoryChange = (category) => {
    this.setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
    }));
    this.props.navigate(`/${category}`);
  };

  render() {
    return (
      <MainContainer>
        <Query query={GET_CATEGORIES}>
          {({ loading, data }) => {
            if (loading) { return null; }
            return data.categories.map((option) => (
              <CategoryButton
                key={option.name}
                category={option.name}
                selectedCategory={this.state.selectedCategory}
                handleCategoryChange={this.handleCategoryChange}
              />
            ));
          }}
        </Query>
      </MainContainer>
    );
  }
}
Categories.propTypes = {
  navigate: PropTypes.func.isRequired,
};
export default withRouter(Categories);
