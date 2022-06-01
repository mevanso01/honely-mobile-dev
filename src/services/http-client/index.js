import { store, persistor } from '../../store/configureStore';
import { cognitoRefreshSession } from '../../store/reducer/cognitoUser'

// DEV
const base_url = 'https://api.honely.com/';
// PROD
const failureMsg = 'Something went wrong. Please try again.';
const expiredTokenMsgs = ['The incoming token has expired', 'Unauthorized']

exports.doPost = (url, data, onSuccess, onFail, isPut) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser;

  return fetch(base_url + url, {
      method: isPut ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await exports.doPost(url, data, onSuccess, onFail, isPut)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
}

exports.doPatch = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser;

  return fetch(base_url + url, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await exports.doPatch(url, data, onSuccess, onFail)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
}

exports.doDelete = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser;

  return fetch(base_url + url, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Authorization': `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await exports.doDelete(url, data, onSuccess, onFail)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
}

exports.doGet = (url, data, onSuccess, onFail) => {
  const state = store.getState();
  const { jwtToken } = state.cognitoUser;
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
        'Authorization': `Bearer ${jwtToken}`,
      },
    })
    .then((response) => response.json())
    .then(async (response) => {
      if (!response) {
        throw failureMsg;
      }
      if (expiredTokenMsgs.includes(response?.message)) {
        try {
          await store.dispatch(cognitoRefreshSession())
          response = await exports.doGet(url, data, onSuccess, onFail)
          !onSuccess || onSuccess(response);
        } catch (error) {
          throw error
        }
      }
      !onSuccess || onSuccess(response);
      return response;
    })
    .catch((error) => {
      !onFail || onFail(error);
      return {
        error: 1,
        msg: failureMsg
      }
    });
};