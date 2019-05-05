import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { APP_WEBSOCKET_URL } from '../utils/constants';
import { CONNECT_ATTEMPT_FAILED } from './constants';

class ParticipantApi {
  instance = null;
  code = null;
  token = null;
  username = null;
  isRunning = false;
  stompClient = null;
  socket = null;
  dispatch = () => {};

  constructor(dispatch) {
    this.dispatch = dispatch;
  }

  join(username, code, token) {
    this.code = code;
    this.token = token;
    this.username = username;
    this.start();
  }

  start() {
    if (this.isRunning) {
      return;
    }

    if (this.stompClient && this.stompClient.connected) {
      return;
    }

    if (this.socket && this.socket != null) {
      this.socket.close();
    }

    if (this.stompClient && this.stompClient != null) {
      this.stompClient.disconnect();
    }

    // reverse proxy does not like websockets, and we have no dedicated web server for socket streaming, so
    // we can only use XHR Polling
    // this.socket = new SockJS(APP_WEBSOCKET_URL); // <- this could be used for normal websocket transport
    this.socket = new SockJS(APP_WEBSOCKET_URL, null, { transports: ['xhr-streaming', 'xhr-polling'] });
    this.stompClient = Stomp.over(this.socket);
    this.stompClient.connect({}, () => {
      // on success
      try {
        this.isRunning = true;
        this.stompClient.send(`/app/board/join/${this.code}/${this.token}`, {}, JSON.stringify({ username: this.username }));
      } catch (error) {
        console.log(error);
      }

      this.keepalive();
    }, () => {
      // on error, retry after 3 seconds
      setTimeout(() => {
        console.error('Warning: keepalive service could not start due to websocket failure, reconnecting in 3 seconds');
        this.dispatch({ type: CONNECT_ATTEMPT_FAILED });
        this.isRunning = false;
        this.start();
      }, 3000);
    });
  }

  keepalive() {
    if (!this.isRunning) {
      return;
    }

    setTimeout(() => {
      try {
        if (this.stompClient.connected) {
          this.stompClient.send(`/app/board/join/${this.code}/${this.token}`,
            {},
            JSON.stringify({ username: this.username, participantState: this.participantState }));
        } else {
          // retry connect
          setTimeout(() => {
            // we attempt to reconnect with a little delay, connection might have been restored by a previous cycle
            if (!this.stompClient.connected) {
              console.error('Warning: keepalive message could not be sent (broken pipe), reconnecting in 3 seconds');
              this.isRunning = false;
              this.start();
            }
          }, 3000);
          return;
        }
      } catch (error) {
        console.log(error);
      }

      console.log(`Keepalive message sent in the name of ${this.username}`);
      this.keepalive();
    }, 3000);
  }

  static getInstance(dispatch) {
    if (ParticipantApi.instance == null) {
      ParticipantApi.instance = new ParticipantApi(dispatch);
    }

    return ParticipantApi.instance;
  }
}

export default ParticipantApi;
