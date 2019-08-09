import { Alert } from 'react-native';
import asyncStorage from '../helper/asyncStorage'
import axios from "axios";


export async function login(username, password) {
  let success = false;
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
        //handle success
        if (response.status == 200) {

          var responseData = response.data;

          // check if responseData is a string or json
          if (isJsonString(responseData)) {
            console.log('IsString')
            responseData = responseData.replace(/ /g, '');
            responseData = responseData.replace(/\s/g, "");
            var jsonWithWhitespaceRemovedJSON = JSON.parse(responseData)
            
            parsed_response = jsonWithWhitespaceRemovedJSON;
          } else {
            console.log('IsJSON')
            parsed_response = responseData;
          }
        }
      })
      .catch(function (err) {
        //handle error
        // console.log("a", err);
        // console.log("aa", err.response.data);
        // console.log("aab", err.response.status);

        var responseData = err.response.data;

        if (isJsonString(responseData)) {
        responseData = responseData.replace(/ /g, '');
        responseData = responseData.replace(/\s/g, "");
        var jsonWithWhitespaceRemovedJSON = JSON.parse(responseData)

        parsed_response = jsonWithWhitespaceRemovedJSON;
      }else {
        parsed_response = responseData;
      }
        throw err;
      });
  } catch (error) {
    console.log("catch block", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return parsed_response;
};


// export async function login(username, password) {
//   let formData = new FormData();
//   formData.append('user', username);
//   formData.append('password', password);

//   let fetchCallback = await fetch('https://examination.offee.in/admin/login_controller.php', {
//     method: 'POST',
//     body: formData
//   });

//   console.log(fetchCallback)

//   let responseJson = await fetchCallback.json();

//   // let cat = responseJson.cat
//   // let name = responseJson.name

//   // console.log(cat);
//   // console.log(name);

//   // Storage.setItem('cat', cat)
//   // Storage.setItem('name', name)


//   if (responseJson.status == '5') {
//     console.log('success');
//     Storage.setItem('user', responseJson)
//   }
//   return responseJson;
// }


///////////////// FETCH SUBJECT LIST /////////////////////

export async function subjectList(category, user) {
  let success = false;
  try {
    let formData = new FormData();
    formData.append("cat", category);
    formData.append("user", user);

    await axios({
      method: "post",
      url: "https://examination.offee.in/admin/login_controller.php",
      data: formData,
      config: { headers: { "Content-Type": "application/json" } }
    })
      .then(function (response) {
        //handle success
        // console.log("1", response);
        if (response.status == 200) {

          // console.log("2", response.data);
          var responseData = response.data;
          responseData = responseData.replace(/ /g, '');
          responseData = responseData.replace(/\s/g, "");
          // console.log("3", responseData)

          var jsonWithWhitespaceRemovedJSON = JSON.parse(responseData)
          // console.log("4", jsonWithWhitespaceRemovedJSON);
          // console.log("5", jsonWithWhitespaceRemovedJSON.name);

          if (jsonWithWhitespaceRemovedJSON.status == "5") {
            success = true;
            console.log('success');
            Storage.setItem('user', jsonWithWhitespaceRemovedJSON)
          }

        }
      })
      .catch(function (err) {
        //handle error
        console.log("a", err);
        console.log("aa", err.response.data);
        console.log("aab", err.response.status);

        var responseData = err.response.data;
        responseData = responseData.replace(/ /g, '');
        responseData = responseData.replace(/\s/g, "");
        console.log("3", responseData)

        var jsonWithWhitespaceRemovedJSON = JSON.parse(responseData)
        console.log("4", jsonWithWhitespaceRemovedJSON.status);

        if (err.response.status == 404) {

          console.log('User does not exists')
          if (jsonWithWhitespaceRemovedJSON.status == "-1") {
            Alert.alert('User does not exists !')
          }

        } else if (err.response.status == 401) {

          console.log('Password is incorrect')
          if (jsonWithWhitespaceRemovedJSON.status == "-2") {
            Alert.alert('Password is incorrect !')
          }

        }
        throw err;
      });
  } catch (error) {
    console.log("b", error);
    Alert.alert("Something went wrong");
    throw error;
  }
  return success;
};

// export async function subjectList(category, user) {
//   let formData = new FormData();
//   formData.append('action', 'FETCH_SUBJECTS');
//   formData.append('cat', category);
//   formData.append('user', user);

//   let fetchCallback = await fetch('https://examination.offee.in/admin/Controller.php', {
//     method: 'POST',
//     body: formData
//   });

//   console.log(fetchCallback)

//   let responseJson = await fetchCallback.json();
//   if (responseJson.status == 200) {
//     console.log('success', responseJson);
//     //Storage.setItem()

//   }
//   return responseJson;
// }


//////////////// Quiz Activity ///////////////////

export async function quizActivity(quiz) {

  var hours = new Date().getHours()
  var min = new Date().getMinutes()
  var currentTime = hours + ':' + min

  let user = await Storage.getItem('user')

  let formData = new FormData();
  formData.append('action', 'QUIZ_ACTIVITY');
  formData.append('start_time', currentTime);
  formData.append('quiz_id', quiz.QUIZ_ID);
  formData.append('user_id', user.name);

  let fetchCallback = await fetch('https://examination.offee.in/admin/Controller.php', {
    method: 'POST',
    body: formData
  });

  // console.log('quizActivity: ', fetchCallback)

  let responseJson = await fetchCallback.json();
  // console.log('Quiz Activity:',responseJson);

  // if(status == 200){
  // console.log('Quiz Activityy success: ',responseJson);
  // }
  return responseJson;
}



//////////////// Get Questions ///////////////////

export async function getQuestions(quizId) {
  let formData = new FormData();
  formData.append('action', 'GETQUIZDETAILS');
  formData.append('quiz_id', quizId);

  let fetchCallback = await fetch('https://examination.offee.in/admin/Controller.php', {
    method: 'POST',
    body: formData
  });

  //console.log(fetchCallback)

  let responseJson = await fetchCallback.json();
  console.log('Quiz QUESTIONS:', responseJson);

  // if(responseJson.status == 200){
  //   console.log('success',responseJson);
  //   //Storage.setItem()

  // }
  return responseJson;
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


function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}