import React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions } from '../actions/actions';
import { AnnounceDocTitle } from 'react-announce-doc-title';
import ExampleChild from '../components/ExampleChild';

class ExampleContainer extends Component {

  render() {
    return (
      <AnnounceDocTitle title="Example Smart Container - React App">
        <div>
          <h2>Example Connected Component</h2>
          <ExampleChild {...this.props} />
        </div>
      </AnnounceDocTitle>
    );
  }
}

function mapStateToProps(state) {
  return {
    someValues: state.someValues,
  };
}

function mapDispatchToProps(dispatch) {
  const actionMapping = {
    addSomeValue: actions.addSomeValue,
  };

  return bindActionCreators(actionMapping, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ExampleContainer);
