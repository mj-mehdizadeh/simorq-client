import React, {Component} from 'react';
import NewRoom from '../components/NewRoom';
import Api from '../services/api';
import {FILE_UPLOAD, ROOMS_ADD_AVATAR, ROOMS_CREATE, ROOMS_EDIT} from '../constant/methods';
import RoomsCreators from '../redux/rooms';
import connect from 'react-redux/es/connect/connect';
import {goBack} from '../services/navigator';
import ImagePicker from 'react-native-image-picker';

class NewRoomScreen extends Component {

  constructor(props) {
    super(props);
    const {navigation} = props;
    this.state = {
      loading: false,
      page: 'CREATE',
      type: navigation.getParam('type'),
      title: null,
      info: null,
      id: null,
      inviteLink: null,
      username: null,
      availability: 'PRIVATE',
      token: null,
    };
  }

  changeTitle = (text) => {
    this.setState({title: text});
  };
  changeInfo = (text) => {
    this.setState({info: text});
  };
  changeUsername = (text) => {
    this.setState({username: text});
  };
  changeAvailability = (text) => {
    this.setState({availability: text});
  };

  changeAvatar = () => {
    ImagePicker.showImagePicker({
      title: 'Select photo',
      maxWidth: 720,
      maxHeight: 480,
      quality: 0.8,
      videoQuality: 'low',
      noData: true,
      takePhotoButtonTitle: 'Camera',
      chooseFromLibraryButtonTitle: 'Gallery',
    }, async (response) => {
      if (response.uri) {
        this.setState({
          avatar: response.uri,
        });
        let formdata = new FormData();
        formdata.append('file', {uri: response.uri, name: response.fileName, type: response.type});
        const {token} = await Api.post(FILE_UPLOAD, formdata);
        if (this.state.id) {
          Api.post(ROOMS_ADD_AVATAR, {params: {id: this.state.id}, token});
        } else {
          this.setState({token});
        }
      }
    });
  };

  onSubmit = async () => {
    this.setState({loading: true});
    if (this.state.page === 'CREATE') {
      await this.actionCreate();
    } else {
      await this.actionComplete();
    }
    this.setState({loading: false});
  };

  actionCreate = async () => {
    const {appendRoom} = this.props;
    const {type, title, info} = this.state;
    try {
      const room = await Api.post(ROOMS_CREATE, {
        type, title, info,
      }, {toastError: true});
      await appendRoom(room);
      if (this.state.token) {
        await Api.post(ROOMS_ADD_AVATAR, {params: {id: room.id}, token: this.state.token});
      }
      if (type === 'GROUP') {
        return goBack();
      }
      this.setState({
        page: 'COMPLETE',
        id: room.id,
        inviteLink: room.username,
        availability: room.availability,
      });
    } catch (e) {
    }
  };

  actionComplete = async () => {
    const {appendRoom} = this.props;
    const {id, username, availability} = this.state;
    try {
      if (availability === 'PUBLIC') {
        const room = await Api.patch(ROOMS_EDIT, {params: {id}, username}, {toastError: true});
        await appendRoom(room);
      }
      goBack();
    } catch (e) {
    }
  };

  render() {
    return (
      <NewRoom
        page={this.state.page}
        type={this.state.type}
        title={this.state.title}
        info={this.state.info}
        username={this.state.username}
        inviteLink={this.state.inviteLink}
        availability={this.state.availability}
        loading={this.state.loading}
        changeTitle={this.changeTitle}
        changeInfo={this.changeInfo}
        changeAvailability={this.changeAvailability}
        changeUsername={this.changeUsername}
        changeAvatar={this.changeAvatar}
        onSubmit={this.onSubmit}
      />
    );
  }
}

function bindAction(dispatch) {
  return {
    appendRoom: room => dispatch(RoomsCreators.appendRoom(room)),
  };
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, bindAction)(NewRoomScreen);
