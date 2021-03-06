import React from 'react';
import { observer } from 'mobx-react';
import { StoreContext } from '../stores';
import { withRouter } from 'react-router-dom';
import DesignComponent from './DesignComponent';

@withRouter
@observer
export default class Design extends React.Component {
  static contextType = StoreContext;

  render() {
    return <DesignComponent from="design" />;
  }
}
