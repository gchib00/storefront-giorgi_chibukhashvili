import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Title = styled.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: normal;
  font-size: 37px;
  margin-left: 4rem;
`;
class CategoryTitle extends PureComponent {
  render() {
    const { selectedCategory } = this.props;
    return (
      <Title>{selectedCategory}</Title>
    );
  }
}
CategoryTitle.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  selectedCategory: state.selectedCategory,
});
export default connect(mapStateToProps)(CategoryTitle);
