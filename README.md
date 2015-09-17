React Announceable Document Title
====================

Provides a declarative way to specify `document.title` in a single-page app that is accessible to screen readers.
This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect), inspired by [React Document Title](https://github.com/gaearon/react-document-title).

====================

## Installation

```
npm install --save jasonblanchard/react-announceable-document-title
```

Dependencies: React >= 0.13.0

## Features

* Does not emit DOM, not even a `<noscript>`;
* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, so you can define app-wide and page-specific titles;
* Works just as well with isomorphic apps.
* Announces page title changes to screen readers

## Example

```javascript
import { React } from 'react';
import { AnnounceableDocumentTitle } from 'react-announceable-document-title';

var RootContainer = React.createClass({
  render: function () {
    // Use "My Web App" if no child overrides this
    return (
      <AnnounceableDocumentTitle title='My Web App'>
        {this.props.children}
      </DocumentTitle>
    );
  }
});

var HomePage = React.createClass({
  render: function () {
    // Use "Home" while this component is mounted
    return (
      <AnnounceableDocumentTitle title='Home'>
        <h1>Home, sweet home.</h1>
      </DocumentTitle>
    );
  }
});

var NewArticlePage = React.createClass({
  mixins: [LinkStateMixin],

  render: function () {
    // Update using value from state while this component is mounted
    return (
      <AnnounceableDocumentTitle title={this.state.title || 'Untitled'}>
        <div>
          <h1>New Article</h1>
          <input valueLink={this.linkState('title')} />
        </div>
      </DocumentTitle>
    );
  }
});
```

In your main page layout, add the a11y-toolkit-announcer div to hold announce messages:

```javascript
import { React } from 'react';
import { A11yToolkitAnnouncer } from 'react-announceable-document-title';

export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <A11yToolkitAnnouncer />

        <h1>App</h1>
        ...
      </div>
    );
  }
}
```

## Server Usage

If you use it on server, call `AnnounceableDocumentTitle.rewind()` **after rendering components to string** to retrieve the title given to the innermost `DocumentTitle`. You can then embed this title into HTML page template.

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server**, or you'll get a memory leak.
