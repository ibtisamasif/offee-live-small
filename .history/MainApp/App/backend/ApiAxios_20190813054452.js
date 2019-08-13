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
    let formData = new FormData();
    formData.append("cat", category);
    formData.append("user", user);

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/fetch_subjects_controller.php",
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
    console.log("catchFetchSubjects", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}


//////////////// Quiz Activity ///////////////////

export async function quizActivity(quiz) {
  
  let parsed_response = null;
  try{
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
    console.log("catchquizActivity", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
}



//////////////// Get Questions ///////////////////

export async function getQuestions(quizId) {
  let parsed_response = null;
  try{
  let formData = new FormData();
  formData.append('quiz_id', quizId);

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

export async function submitAnswers(quizId) {
  let formData = new FormData();
  formData.append('action', 'GETQUIZDETAILS');
  formData.append('quiz_id', quizId);

  let fetchCallback = await fetch('https://examination.offee.in/admin/Controller.php', {
    method: 'POST',
    body: formData
  });

  //console.log(fetchCallback)

  let responseJson = await fetchCallback.json();
  //console.log('Quiz QUESTIONS:',responseJson);

  // if(responseJson.status == 200){
  //   console.log('success',responseJson);
  //   //Storage.setItem()

  // }
  return responseJson;
}



// export async function login(username, password) {
//   fetch('https://examination.offee.in/admin/Controller.php', {
//   method: 'POST',
//   headers: {
//      Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//       "action":"AUTHENTICATE",
//       "user":username,
//       "password" : password
//   }),
// }).then((response) => response.json())
//     .then((responseJson) => {
//       console.log('Response', responseJson);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }


function stringToJson(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

function isString(value){
  return typeof value === 'string' || value instanceof String;
}

function cleanStringAndReturnIntoJson(str) {
  try {
    str = str.replace(/ /g, '');
    str = str.replace(/\s/g, "");
    return JSON.parse(str);
  } catch (e) {
      return;
  }
}