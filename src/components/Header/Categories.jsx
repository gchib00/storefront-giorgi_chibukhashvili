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
  constructor(props) {
    super(props);
    this.state = {
      selectedCategory: 'all',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const { selectedCategory } = this.state;
    // ensure that the category param matches the selectedCategory state value:
    const currentPath = location.pathname.split('/')[1];
    if (currentPath && selectedCategory !== currentPath) {
      this.setState((prevState) => ({
        ...prevState,
        selectedCategory: currentPath,
      }));
    }
  }

  handleCategoryChange = (category) => {
    const { navigate } = this.props;
    this.setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
    }));
    navigate(`/${category}`);
  };

  render() {
    const { selectedCategory } = this.state;
    return (
      <MainContainer>
        <Query query={GET_CATEGORIES}>
          {({ loading, data }) => {
            if (loading) { return null; }
            return data.categories.map((option) => (
              <CategoryButton
                key={option.name}
                category={option.name}
                selectedCategory={selectedCategory}
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
  location: PropTypes.objectOf(PropTypes.string).isRequired,
  navigate: PropTypes.func.isRequired,
};
export default withRouter(Categories);
