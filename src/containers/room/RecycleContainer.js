// @flow
import * as React from 'react';
import PropTypes from 'prop-types';
import {Dimensions} from 'react-native';
import {DataProvider, LayoutProvider, RecyclerListView} from 'recyclerlistview';
import MessageContainer from '../../containers/MessageContainer';

class RecycleContainer extends React.PureComponent {
  constructor(args) {
    super(args);
    let {width} = Dimensions.get('window');
    this._dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });
    this._layoutProvider = new LayoutProvider(
      index => 1,
      (type, dim) => {
        dim.width = width;
        dim.height = 58;
      },
    );
    this.state = {
      dataProvider: this._dataProvider.cloneWithRows(this.props.history),
    };
  }

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
    return (<MessageContainer id={messageId}/>);
  };
}

RecycleContainer.propTypes = {
  history: PropTypes.array.isRequired,
  onScroll: PropTypes.func.isRequired,
  recycleRef: PropTypes.func.isRequired,
};

export default RecycleContainer;



