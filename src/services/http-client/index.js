import { store, persistor } from '../../store/configureStore';
import { setUser, signoutUser } from '../../store/action/setUser';
import * as Keychain from 'react-native-keychain';

// DEV
const base_url = 'https://api.honely.com/';
// PROD
// const base_url = 'https://hubapi.getmyauto.com/api/';
const sessionExpiredServerMsg = "Your session has expired or is invalid.";
const sessionExpiredMsg = "Your session has expired.";
const failureMsg = 'Something went wrong. Please try again.';

const doLogin = async (onSuccess, onFail) => {
  let password = '';
  try {
    const credentials = await Keychain.getGenericPassword({
      service: 'GetMyAutoAppraisal-Daniel'
    });
    if (credentials) {
      password = credentials.password;
    }
  } catch (e) {
    console.log("Falied to get password", e);
    throw sessionExpiredMsg;
  }

  const state = store.getState();
  const data = {
    email: state.currentUser.email,
    password
  };

  return fetch(base_url + 'login/m/inv', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Origin': '',
    },
    body: JSON.stringify(data),
  })
  .then((response) => response.json())
  .then((response) => {
    if (!response) {
      throw failureMsg;
    }
    if (!response.error) {
      const { token, sessionID } = response;
      store.dispatch(setUser({
        sessionID,
        jwtAccessToken: token
      }));
    }
    !onSuccess || onSuccess(response);
    return response;
  })
  .catch((error) => {
    !onFail || onFail(error);
    return {
      error: 1,
      msg: error === sessionExpiredMsg ? sessionExpiredMsg : failureMsg
    }
  });
};

exports.doUploadFile = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtAccessToken } = state.currentUser;
  return fetch(base_url + url, {
      method: 'POST',
      headers: {
        'Origin': '',
        'Authorization': `Bearer ${jwtAccessToken}`,
      },
      body: data,
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (response.error && response.msg === sessionExpiredServerMsg) {
        store.dispatch(signoutUser());
        throw sessionExpiredMsg;
        // try {
        //   await doLogin();
        //   response = await exports.doUploadFile(url, data);
        //   !onSuccess || onSuccess(response);
        // } catch (error) {
        //   throw error;
        // }
      } else {
        !onSuccess || onSuccess(response);
      }
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: error === sessionExpiredMsg ? sessionExpiredMsg : failureMsg
      }
    });
}

exports.doPost = (url, data, onSuccess, onFail, isPut) => {
  const state = store.getState();
  // const { jwtAccessToken } = state.currentUser;
  return fetch(base_url + url, {
      method: isPut ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        // 'Authorization': `Bearer ${jwtAccessToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (response.error && response.msg === sessionExpiredServerMsg) {
        store.dispatch(signoutUser());
        throw sessionExpiredMsg;
        try {
          await doLogin();
          response = await exports.doPost(url, data, null, null, isPut);
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error;
        }
      } else {
        !onSuccess || onSuccess(response);
      }
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: error === sessionExpiredMsg ? sessionExpiredMsg : failureMsg
      }
    });
}

exports.doDelete = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtAccessToken } = state.currentUser;
  return fetch(base_url + url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtAccessToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (response.error && response.msg === sessionExpiredServerMsg) {
        store.dispatch(signoutUser());
        throw sessionExpiredMsg;
        try {
          await doLogin();
          response = await exports.doDelete(url, data);
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error;
        }
      } else {
        !onSuccess || onSuccess(response);
      }
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: error === sessionExpiredMsg ? sessionExpiredMsg : failureMsg
      }
    });
}

exports.doGet = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  // const { jwtAccessToken } = state.currentUser;
  let param = "";
  for (var key in data) {
    if (param == "") {
      param += "?";
    } else {
      param += "&";
    }

    param += key + "=" + data[key];
  }

  return fetch(base_url + url + param, {
      method: 'GET',
      headers: {
        'Origin': '',
        // 'Authorization': `Bearer ${jwtAccessToken}`,
      },
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (response.error && response.msg === sessionExpiredServerMsg) {
        store.dispatch(signoutUser());
        throw sessionExpiredMsg;
        try {
          await doLogin();
          response = await exports.doGet(url, data);
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error;
        }
      } else {
        !onSuccess || onSuccess(response);
      }
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: error === sessionExpiredMsg ? sessionExpiredMsg : failureMsg
      }
    });
};