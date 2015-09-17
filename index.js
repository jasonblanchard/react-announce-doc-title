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
  if (title) {
    a11yToolkit.announce(title + " has loaded", 'assertive');
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

var wrappedAnnounceableDocumentTitle = withSideEffect(
  reducePropsToState,
  handleStateChangeOnClient
)(AnnounceableDocumentTitle);

var A11yToolkitAnnouncer = React.createClass({
  render: function() {
    return React.createElement('div', {id:'a11y-toolkit-announcer', 'aria-live': 'polite'});
  }
});

module.exports = {
  AnnounceableDocumentTitle: wrappedAnnounceableDocumentTitle,
  A11yToolkitAnnouncer: A11yToolkitAnnouncer,
};
