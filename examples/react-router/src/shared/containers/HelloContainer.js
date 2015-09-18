import React from 'react';
import { PropTypes } from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';

const propTypes = {
  name: PropTypes.string,
};

export default class Hello extends React.Component {
  render() {
    return (
      <AnnounceDocTitle title={`Hello ${this.props.params.name} - React App`}>
        <div>
          Hello, {this.props.params.name}!
        </div>
      </AnnounceDocTitle>
    );
  }
}

Hello.propTypes = propTypes;
