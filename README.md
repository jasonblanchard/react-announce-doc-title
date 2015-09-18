# WIP: React Announceable Document Title

Provides a declarative way to specify `document.title` in a single-page app that is accessible to screen readers.
This component can be used on server side as well.

Built with [React Side Effect](https://github.com/gaearon/react-side-effect), inspired by [React Document Title](https://github.com/gaearon/react-document-title).

This is a work in progress!!

## Installation

```
npm install --save jasonblanchard/react-announceable-document-title
```

Dependencies: React >= 0.13.0

## Features

* Like a normal React compoment, can use its parent's `props` and `state`;
* Can be defined in many places throughout the application;
* Supports arbitrary levels of nesting, so you can define app-wide and page-specific titles;
* Works with universal apps.
* Announces page title changes to screen readers

## Usage

### 1. Set the title
Wrap page containers in the `<AnnounceDocTitle>` component:

```javascript
import React from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';

export default class AboutPage extends React.Component {
  render() {
    return(
      <AnnounceDocTitle title="About - React App">
        <div>
          All about this sweet, sweet single page app.
        </div>
      </AnnounceDocTitle>
    );
  }
```

If you have `<AnnounceDocTitle>` components nested inside other `<AnnounceDocTitle>` components, the inner-most `title` will win.

### 2. Add the announcer component
In your root container or main page layout, add the `<A11yToolkitAnnouncer />` container to hold the announce messages:

```javascript
import React from 'react';
import { A11yToolkitAnnouncer } from 'react-announce-doc-title';

export default class RootContainer extends React.Component {
  render() {
    return (
      <div>
        <A11yToolkitAnnouncer />
        
        <h1>Single Page React App</h1>
        {this.props.children}
      </div>
    );
  }
```

This will add a visibly hidden (but reachable by screen readers) element on the page that has an `aria-live` tag that will automatically announce when the content changes. Each time the page title updates, it will populate here and trigger an announcement.

It's best practice that this container is available on the page at page load, not added later via a JS script. Using the `<A11yToolkitAnnouncer />` in your root continer assumes you are rendering your app to string on the server as a universal (or isomorpic) app. (See below for more details on server rendering the page title). If you are not building a universal app, do no use the `<A11yToolkitAnnouncer />` and add the announcer div manually on your HTML page following [these instructions from `a11y-toolkit`](https://github.com/jasonblanchard/a11y-toolkit#announce).

### 3. Get page title on the server
When rendering your app on the server, you'll want to pull out the page title from your component tree and set it  in the template so that it has the right title on initial pagel load. Here's a truncated example using Express:

`server.js`:
```javascript
import express from 'express';
import exphbs from 'express-handlebars';
import React from 'react';
import { AnnounceDocTitle } from 'react-announce-doc-title';
import RootContainer from '../shared/containers/RootContainer';

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

...

app.get('/*', (req, res) => {
  const markup = React.renderToString(<RootContainer />);
  const documentTitle = AnnounceDocTitle.rewind();
  
  res.render('index', {
    markup: markup,
    documentTitle: documentTitle
  });
});
```

`index.handlebars`:
```html
<!DOCTYPE html>
<html>
  <head>
    <title>{{documentTitle}}</title>
  </head>
  <body>
    <div id='app'>{{{markup}}}</div>
  </body>
</html>
```

Because this component keeps track of mounted instances, **you have to make sure to call `rewind` on server after `renderToString`**, or you'll get a memory leak. More info in the [React Side Effect docs](https://github.com/gaearon/react-side-effect#api).
