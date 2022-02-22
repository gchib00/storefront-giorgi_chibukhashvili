import React, { PureComponent } from 'react';
import styled from 'styled-components';

const AttributeTitle = styled.h2`
    display: flex;
    flex: flex-start;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
`;
const OptionBoxes = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: auto;
`;
export default class ProductAttributes extends PureComponent {
  renderAttributes = (product) => {
    const array = []
    product.attributes.map(attribute => array.push(
      <div key={uuidv4()}>
          <AttributeTitle>{attribute.name}:</AttributeTitle>
              <OptionBoxes>
                  <OptionSelectorBox 
                      attribute={attribute} 
                      product={product} 
                      saveOption={this.props.saveOption} 
                      selectedOptions={this.props.selectedOptions}    
                  />
              </OptionBoxes>
          <br/>
      </div>
    ));
    return array
  }

  render() {
    return (

    );
  }
}
