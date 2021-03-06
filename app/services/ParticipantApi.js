/**
 * This class is responsible for
 *  - keeping websocket connection stable between Participant and the backend service
 *    sending heartbeat messages along with the participant's status (ready, not ready)
 *  - publishing feedbacks
 */

import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import 'whatwg-fetch';
import ParticipantApiMock from './ParticipantApi.Mock';
import { APP_WEBSOCKET_URL, APP_BASE_URL } from '../utils/constants';
import {
  brokenPipe,
  connecting,
  connected,
  publishingFeedbacks,
  votingStarted,
} from './actions';
import BoardApi from './BoardApi';

class ParticipantApi {
  instance = null;
  code = null;
  token = null;
  username = null;
  isRunning = false;
  stompClient = null;
  socket = null;
  participantState = 'in-progress'; // in-progress|ready
  dispatch = () => {};

  constructor(dispatch) {
    this.dispatch = dispatch;

    this.onBoardEventReceived = this.onBoardEventReceived.bind(this);
  }

  async join(username, code, token) {
    this.code = code;
    this.token = token;
    this.username = username;
    this.start();
  }

  async publish(feedbacks, username, code, token) {
    this.dispatch(publishingFeedbacks(feedbacks.map((f) => f.id)));

    const payload = feedbacks.map((feedback) => ({
      comment: feedback.comment,
      username,
      glad: feedback.glad,
      noControl: 1.0,
      sessionCode: code,
      sessionToken: token,
    }));

    const response = await fetch(`${APP_BASE_URL}/rest/participant/sticker/${code}/${token}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    let responseBody = null;
    try {
      responseBody = JSON.parse(await response.text());
    } catch (error) {
      if (response.status !== 200) {
        console.log(error);
      }
    }

    if (response.status === 200 && responseBody.errorCode === 0) {
      // notify scrum master's board about the update
      const stickers = JSON.parse(JSON.stringify(feedbacks));
      stickers.map((s) => { s.id = null; return null; }); // removing id, backend does not use it
      this.stompClient.send(`/app/board/sticker/${this.code}/${this.token}`, {}, JSON.stringify({ stickers }));
      return true;
    }

    return false;
  }

  async onBoardEventReceived(message) {
    const body = JSON.parse(message.body);
    const { action } = body;

    if (action === 'voting') {
      console.log('Dispatching Voting event');
      const boardApi = new BoardApi();
      const sessionDetails = await boardApi.getBoardDetails(this.code, this.token);
      ParticipantApi.getInstance(null).dispatch(
        votingStarted({
          boardFeedbacks: sessionDetails.stickers,
          votes: sessionDetails.stickerVotes
        }));
    }
  }

  vote(feedbackId, voteState) {
    this.stompClient.send(`/app/board/sticker/${this.code}/${this.token}/${feedbackId}/vote`, {}, JSON.stringify({ vote: voteState, username: this.username }));
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
    this.stompClient.debug = null;

    this.dispatch(connecting());
    this.stompClient.connect({}, () => {
      // on success
      try {
        this.dispatch(connected());
        this.isRunning = true;
        this.stompClient.send(`/app/board/join/${this.code}/${this.token}`, {}, JSON.stringify({ username: this.username }));
        this.subscription = this.stompClient.subscribe(`/topic/board/${this.code}/${this.token}`, this.onBoardEventReceived);
      } catch (error) {
        console.log(error);
      }

      this.keepalive();
    }, () => {
      // on error, retry after 3 seconds
      setTimeout(() => {
        this.dispatch(brokenPipe());
        console.error('Warning: keepalive service could not start due to websocket failure, reconnecting in 3 seconds');
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
              this.dispatch(brokenPipe());
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
      if (!dispatch) {
        return null;
      }

      if (process.env.NODE_ENV === 'production') {
        // use producation service instead of the mock always for production build
        // this applies to artifact built with "npm run build"
        ParticipantApi.instance = new ParticipantApi(dispatch);
      } else {
        ParticipantApi.instance = new ParticipantApi(dispatch);
        // ParticipantApi.instance = new ParticipantApiMock(dispatch, false, false);
      }
    }

    return ParticipantApi.instance;
  }
}

export default ParticipantApi;
