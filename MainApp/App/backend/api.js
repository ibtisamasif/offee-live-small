
export async function login(username, password) {
  let formData = new FormData();
  formData.append('action', 'AUTHENTICATE');
  formData.append('user', username);
  formData.append('password', password);

  let fetchCallback = await fetch('https://examination.offee.in/admin/Controller.php', {
    method: 'POST',
    body: formData
  });

  console.log(fetchCallback)

  let responseJson = await fetchCallback.json();
  if(responseJson.status == '5'){
    console.log('success');
  }
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
