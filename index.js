'use strict';

var React = require('react'),
    withSideEffect = require('react-side-effect'),
    a11yTooklit = require('a11y-toolkit');

function reducePropsToState(propsList) {
  var innermostProps = propsList[propsList.length - 1];
  if (innermostProps) {
    return innermostProps.title;
  }
}

function handleStateChangeOnClient(title) {
  if (title) {
    a11yToolkit.announce(title, 'assertive');
  }
  document.title = title || '';
}

var AnnounceableDocumentTitle = React.createClass({
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

module.exports = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(AnnounceableDocumentTitle);
