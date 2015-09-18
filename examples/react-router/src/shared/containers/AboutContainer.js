import React from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';

export default class About extends React.Component {
  render() {
    return (
      <AnnounceDocTitle title="About - React App">
        <div>
          Arrr, me matey
        </div>
      </AnnounceDocTitle>
    );
  }
}
