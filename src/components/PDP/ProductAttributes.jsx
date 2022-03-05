/* eslint-disable object-curly-newline */
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
export default class ProductAttributes extends PureComponent {
  render() {
    const { product, optionBoxSize, setSelectedAttributes, selectedAttributes } = this.props;
    return (
      product.attributes.map((attribute) => (
        <div key={attribute.name + product.name}>
          {optionBoxSize === 'small' ? null : <AttributeTitle>{attribute.name}:</AttributeTitle>}
          <AttributesContainer>
            {attribute.type === 'swatch'
              ? <AttributeColorSelectors
                  attribute={attribute}
                  selectedAttributes={selectedAttributes}
                  setSelectedAttributes={setSelectedAttributes}
                  optionBoxSize={optionBoxSize}
              />
              : <AttributeSelectors
                  attribute={attribute}
                  selectedAttributes={selectedAttributes}
                  setSelectedAttributes={setSelectedAttributes}
                  optionBoxSize={optionBoxSize}
              />}
          </AttributesContainer>
        </div>
      ))
    );
  }
}
ProductAttributes.propTypes = {
  product: PropTypes.object.isRequired,
  // optionBoxSize lets the attribute selector components know if the option boxes should be small:
  optionBoxSize: PropTypes.string,
  setSelectedAttributes: PropTypes.func.isRequired,
  selectedAttributes: PropTypes.array.isRequired,
};
