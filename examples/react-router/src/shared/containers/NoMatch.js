import React from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';

export default class NoMatch extends React.Component {
  render() {
    return (
      <AnnounceDocTitle title="Not Found">
        <div>
          404 :(
        </div>
      </AnnounceDocTitle>
    );
  }
}
