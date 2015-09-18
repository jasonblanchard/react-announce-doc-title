'use strict';

var React = require('react'),
    withSideEffect = require('react-side-effect'),
    a11yToolkit = require('a11y-toolkit');

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

function handleStateChangeOnClient(title) {
  var currentDocTitle = document.title;

  if (title) {
    document.title = title;

    if (currentDocTitle != title) {
      a11yToolkit.announce(title + " has loaded", 'assertive');
    }
  }
}

var AnnounceDocTitle = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired
  },

  render: function render() {
    if (this.props.children) {
      return React.Children.only(this.props.children);
    } else {
      return null;
    }
  }
});

var wrappedAnnounceDocTitle = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(AnnounceDocTitle);

var A11yToolkitAnnouncer = React.createClass({
  render: function() {
    return React.createElement('div', {
      id:'a11y-toolkit-announcer', 
      'aria-live': 'polite',
      style: {
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }
    });
  }
});

module.exports = {
  AnnounceDocTitle: wrappedAnnounceDocTitle,
  A11yToolkitAnnouncer: A11yToolkitAnnouncer,
};
