// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import MessageContainer from '../message';
import {getMessageBoxSize, getMessageType} from '../../services/messages/helper';

let {width} = Dimensions.get('window');

class RecycleContainer extends React.PureComponent {
  constructor(args) {
    super(args);
    this._dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    this._layoutProvider = new LayoutProvider(
      this.layoutProviderType,
      this.setLayoutForType,
    );
    this.state = {
      dataProvider: this._dataProvider.cloneWithRows(this.props.history),
    };
  }

  layoutProviderType = (index) => {
    return getMessageType(this.props.history[index]);
  };
  setLayoutForType = (type, dim, index) => {
    dim.width = width;
    dim.height = getMessageBoxSize(this.props.history[index], this.props.roomType);
  };

  componentWillReceiveProps(nextProps) {
    const {history} = nextProps;
    this.setState({
      dataProvider: this._dataProvider.cloneWithRows(history),
    });
  }

  onScroll = (event, offsetX, offsetY) => {
    const {onScroll} = this.props;
    onScroll(event, offsetX, offsetY);
  };

  recycleRef = (ref) => {
    const {recycleRef} = this.props;
    recycleRef(ref);
  };

  render() {
    return <RecyclerListView
      ref={this.recycleRef}
      layoutProvider={this._layoutProvider}
      dataProvider={this.state.dataProvider}
      onScroll={this.onScroll}
      rowRenderer={this._rowRenderer}/>;
  }

  _rowRenderer = (type, messageId) => {
    return (<MessageContainer id={messageId} roomId={this.props.roomId}/>);
  };
}

RecycleContainer.propTypes = {
  history: PropTypes.array.isRequired,
  roomId: PropTypes.string.isRequired,
  roomType: PropTypes.string.isRequired,
  onScroll: PropTypes.func.isRequired,
  recycleRef: PropTypes.func.isRequired,
};

export default RecycleContainer;



