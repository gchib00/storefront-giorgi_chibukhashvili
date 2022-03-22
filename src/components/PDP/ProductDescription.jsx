import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import styled from 'styled-components';

const Description = styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    text-align: left;
`;
export default class ProductDescription extends PureComponent {
  render() {
    const { description } = this.props;
    return (
      <Description
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
      />
    );
  }
}
ProductDescription.propTypes = {
  description: PropTypes.string.isRequired,
};
