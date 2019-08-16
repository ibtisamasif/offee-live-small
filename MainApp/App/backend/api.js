
import Storage from '../helper/asyncStorage'

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

// // export async function quizActivity(quiz) {

// //   var hours = new Date().getHours()
// //   var min = new Date().getMinutes()
// //   var currentTime = hours + ':' + min

// //   let user = await Storage.getItem('user')

// //   let formData = new FormData();
// //   formData.append('action', 'QUIZ_ACTIVITY');
// //   formData.append('start_time', currentTime);
// //   formData.append('quiz_id', quiz.QUIZ_ID);
// //   formData.append('user_id', user.name);

// //   let fetchCallback = await fetch('https://examination.offee.in/admin/Controller.php', {
// //     method: 'POST',
// //     body: formData
// //   });

//   // console.log('quizActivity: ', fetchCallback)

//   let responseJson = await fetchCallback.json();
//   // console.log('Quiz Activity:',responseJson);

//   // if(status == 200){
//     // console.log('Quiz Activityy success: ',responseJson);
//   // }
//   return responseJson;
// }



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
  console.log('Quiz QUESTIONS:',responseJson);

  // if(responseJson.status == 200){
  //   console.log('success',responseJson);
  //   //Storage.setItem()

  // }
  return responseJson;
}


//////////////// Submit Answers ///////////////////

export async function submitAnswers(quizId) {
  let formData = new FormData();
  formData.append('action', 'SUBMIT_ANSWER');
  formData.append('quiz_id', quizId);
  formData.append('userId', userId);
  formData.append('userActivity', userActivity);
  formData.append('endtime', endtime);
  formData.append('data', data);

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
