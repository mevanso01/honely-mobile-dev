import { store, persistor } from '../../store/configureStore';

// DEV
const base_url = 'https://api.honely.com/';
// PROD
const failureMsg = 'Something went wrong. Please try again.';

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
  // const { jwtAccessToken } = state.currentUser;
  return fetch(base_url + url, {
      method: 'DELETE',
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