import React from 'react';
import { PropTypes } from 'react';
import { Link } from 'react-router';
import { AnnounceDocTitle } from 'react-announce-doc-title';

const propTypes = {
  children: PropTypes.any,
};

export default class TopLevelPageContainer extends React.Component {
  render() {
    return (
      <AnnounceDocTitle title="Settings - React App">
        <div>
          <h2>Settings</h2>
          This has a title, but it should be overwritten by its children. Speaking of...
            <Link to="/settings/section">Go to child</Link>
          <br />
          {this.props.children}
        </div>
      </AnnounceDocTitle>
    );
  }
}

TopLevelPageContainer.propTypes = propTypes;
