import Axios from "axios";


export const AUTH = 'AUTH';
export const INV_LOG = 'INV_LOG';
export const SUC_SGUP = 'SUC_SGUP';
export const FETCH_FAC = 'FETCH_FAC';
export const FETCH_STU = 'FETCH_STU';
export const EMAIL = 'EMAIL';
export const PASSWORD = 'PASSWORD';
export const DETAILS = 'DETAILS';
export const UPDETAILS = 'UPDETAILS';
export const SGUPDETAILS = 'SGUPDETAILS';
export const FETCH_MSG = 'FETCH_MSG';
export const FETCH_MSGF = 'FETCH_MSGF';


export function selUser(){
    return {
        type: AUTH,
        payload: 'true'
    };
}

export function inv_log(){
    return {
        type: INV_LOG,
        payload: 'Invalid Details. Please try again!'
    }
}

export function successClick(){
    return {
        type: SUC_SGUP,
        payload: 'Sign Up Successful!'
    }
}

export function fetchFaculty(email){
    
    return function(dispatch) {
        return Axios.get('http://localhost:3001/getProfileF', {params: {email}})
          .then((res) => {
            console.log(res.data);
            dispatch(setFacDetails(res.data));
        });
      };
}


function setFacDetails(result){
    console.log('Result: ', result);
    return {
        type: FETCH_FAC,
        payload: result
    }
}

export function fetchStudent(email){
    
    return function(dispatch) {
        return Axios.get('http://localhost:3001/getProfileS', {params: {email}})
          .then((res) => {
            console.log(res.data);
            dispatch(setStuDetails(res.data));
        });
      };
}

function setStuDetails(result){
    console.log('Result: ', result);
    return {
        type: FETCH_STU,
        payload: result
    }
}

export function fetchMessages(email){
    return function(dispatch) {
        return Axios.get('http://localhost:3001/getMessages', {params: {email}})
          .then((res) => {
            console.log(res.data);
            dispatch(setMsgDetails(res.data));
        });
      };
}

export function fetchMessagesF(courseid){
    return function(dispatch) {
        return Axios.get('http://localhost:3001/getMessagesF', {params: {courseid}})
          .then((res) => {
            console.log(res.data);
            dispatch(setMsgDetailsF(res.data));
        });
      };
}

function setMsgDetails(result){
    console.log('Result: ', result);
    return {
        type: FETCH_MSG,
        payload: result
    }
}

function setMsgDetailsF(result){
    console.log('Result: ', result);
    return {
        type: FETCH_MSGF,
        payload: result
    }
}




// export function setEmail(email){

//     console.log('ACTION EMAIL', email);
//     return {
//         type: EMAIL,
//         payload: email
//     }
// }

// export function setPassword(password){

//     console.log('ACTION PASSWORD', password);
//     return {
//         type: PASSWORD,
//         payload: password
//     }
// }

export function setDetails(details){

    console.log('ACTION CATEGORY', details);
    return {
        type: DETAILS,
        payload: {
            user:[{email: details.email, password: details.password, category: details.category}]
        }
    }
}

export function setUpdateDetails(details){
    return {
        type: UPDETAILS,
        payload: {
            user:[{name: details.name, password: details.password, phone: details.phone, about: details.about, city: details.city, country: details.country, company: details.company, school: details.school, hometown: details.hometown, languages: details.languages, gender: details.gender}]
        }
    }
}

export function setSignUpDetails(details){
    return {
        type: SGUPDETAILS,
        payload: {
            user:[{name: details.name, email: details.password, password: details.password, category: details.category}]
        }
    }
}
