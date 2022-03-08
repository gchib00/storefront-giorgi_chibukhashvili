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
    const selectedCategory = this.props.params.category;
    return (
      <Title>{selectedCategory.toUpperCase()}</Title>
    );
  }
}
CategoryTitle.propTypes = {
  params: PropTypes.object.isRequired,
};
export default withRouter(CategoryTitle);
