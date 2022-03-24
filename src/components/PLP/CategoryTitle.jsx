import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import withRouter from '../HigherOrderComponents';

const Title = styled.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: normal;
  font-size: 37px;
  margin-left: 4rem;
`;
class CategoryTitle extends PureComponent {
  render() {
    const { params } = this.props;
    const { category } = params;
    const selectedCategory = category;
    return (
      <Title>{selectedCategory.toUpperCase()}</Title>
    );
  }
}
CategoryTitle.propTypes = {
  params: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default withRouter(CategoryTitle);
