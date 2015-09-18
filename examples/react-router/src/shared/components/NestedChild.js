import React from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';

export default class NestedChild extends React.Component {
  render() {
    return (
      <AnnounceDocTitle title="Specific Settings Section - React App">
        <div>
          <h2>Some Specific Settings</h2>
          I am a nested component!
        </div>
      </AnnounceDocTitle>
    );
  }
}
