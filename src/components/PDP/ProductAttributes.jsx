/* eslint-disable react/jsx-wrap-multilines */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import AttributeSelectors from './AttributeSelectors';
import AttributeColorSelectors from './AttributeColorSelectors';

const AttributeTitle = styled.h2`
    display: flex;
    flex: flex-start;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
`;
const AttributesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: auto;
`;
const MainContainer = styled.div`
`;
export default class ProductAttributes extends PureComponent {
  render() {
    const { product, optionBoxSize } = this.props;
    return (
      product.attributes.map((attribute) => (
        <MainContainer key={attribute.id}>
          <AttributeTitle>{attribute.name}:</AttributeTitle>
          <AttributesContainer>
            {attribute.type === 'swatch'
              ? <AttributeColorSelectors attribute={attribute} optionBoxSize={optionBoxSize} />
              : <AttributeSelectors attribute={attribute} optionBoxSize={optionBoxSize} />}
          </AttributesContainer>
          <br />
        </MainContainer>
      ))
    );
  }
}
ProductAttributes.propTypes = {
  product: PropTypes.object.isRequired,
  // optionBoxSize lets the attribute selector components know if the option boxes should be small:
  optionBoxSize: PropTypes.string,
};
