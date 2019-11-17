import { Alert } from 'react-native';
import Storage from '../helper/asyncStorage'
import axios from "axios";


export async function login(username, password) {
  let parsed_response = null;
  try {
    let formData = new FormData();
    formData.append("user", username);
    formData.append("password", password);

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/login_controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        console.log('response: ', response);
        //handle success
        if (response.status == 200) {

          console.log('response.data: ', response.data);
          var responseData = response.data;

          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        //handle error
        // console.log("a", err);
        // console.log("aa", err.response.data);
        // console.log("aab", err.response.status);
        throw err;
      });
  } catch (error) {
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}


///////////////// FETCH SUBJECT LIST /////////////////////

export async function subjectList(category, user) {
  let parsed_response = null;
  try {
    await axios({
      method: "get",
      url: "https://examination.offee.in/admin/fetch_subjects_controller.php",
      params: {
        cat: category,
        user: user
      },
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        //handle success
        // console.log("1", response);
        if (response.status == 200) {

          var responseData = response.data;

          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        //handle error
        throw err;
      });
  } catch (error) {
    console.log("catchFetchSubjects", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}


//////////////// Quiz Activity ///////////////////

export async function quizActivity(quiz) {

  let parsed_response = null;
  try {
    var hours = new Date().getHours()
    var min = new Date().getMinutes()
    var currentTime = hours + ':' + min

    let user = await Storage.getItem('user')

    let formData = new FormData();
    formData.append('action', 'QUIZ_ACTIVITY');
    formData.append('start_time', currentTime);
    formData.append('quiz_id', quiz.QUIZ_ID);
    formData.append('user_id', user.name);

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/Controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        //handle success
        // console.log("1", response);
        if (response.status == 200) {

          var responseData = response.data;

          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        //handle error
        throw err;
      });
  } catch (error) {
    console.log("catchQuizActivity", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}

//////////////// Get Questions ///////////////////

export async function getQuestions(quizId, user_name) {
  let parsed_response = null;
  try {
    let formData = new FormData();
    formData.append('quiz_id', quizId);
    formData.append('user_id', user_name);

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/get_quiz_details_controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        //handle success
        // console.log("1", response);
        if (response.status == 200) {

          var responseData = response.data;

          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        //handle error
        throw err;
      });
  } catch (error) {
    console.log("catchGetQuestions", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}


//////////////// Submit Answers ///////////////////

export async function submitAnswers(quizId, userActivity, data) {
  let parsed_response = null;
  try {
    var hours = new Date().getHours()
    var min = new Date().getMinutes()
    var currentTime = hours + ':' + min

    let user = await Storage.getItem('user')

    let formData = new FormData();
    formData.append('action', "SUBMIT_ANSWER");
    formData.append('quiz_id', quizId);
    formData.append('user_id', user.name);
    formData.append('useractivity', userActivity);
    formData.append('end_time', currentTime);
    formData.append('data', JSON.stringify(data));

    console.log("formData: ", formData)

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/Controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        if (response.status == 200) {
          var responseData = response.data;
          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        throw err;
      });
  } catch (error) {
    console.log("catchSubmitAnswers", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}

//////////////// User Activity ///////////////////

export async function userActivity(quiz_id, user_name) {

  let parsed_response = null;
  try {
    let user = await Storage.getItem('user')

    let formData = new FormData();
    formData.append('action', 'USER_ACTIVITY');
    formData.append('quiz_id', quiz_id);
    formData.append('user_id', user_name);

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/Controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        //handle success
        // console.log("1", response);
        if (response.status == 200) {

          var responseData = response.data;

          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        throw err;
      });
  } catch (error) {
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}

//////////////// Log Out ///////////////////

export async function logout(user) {
  let parsed_response = null;
  try {
    let formData = new FormData();
    formData.append('action', 'LOGOUT');
    formData.append('user', user.name);  

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/Controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        console.log('response: ', response);
        //handle success
        if (response.status == 200) {

          console.log('response.data: ', response.data);
          var responseData = response.data;

          // check if responseData is a string or json
          if (isString(responseData)) {
            console.log('IsString', responseData)
            parsed_response = cleanStringAndReturnIntoJson(responseData);
          } else {
            console.log('IsJSON', responseData)
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        throw err;
      });
  } catch (error) {
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}

function isString(value) {
  return typeof value === 'string' || value instanceof String;
}

function cleanStringAndReturnIntoJson(str) {
  try {
    str = str.replace(/ /g, ' ');
    str = str.replace(/\s/g, " ");
    return JSON.parse(str);
  } catch (e) {
    return;
  }
}