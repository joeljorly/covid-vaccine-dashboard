export default function authHeader() {
    let user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.token) {
      console.log("true");
      return { Authorization: 'Bearer ' + user.token }; 
      // return { 'x-access-token': user.accessToken };      
    } else {
      return {};
    }
  }