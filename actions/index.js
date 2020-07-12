import Axios from 'axios'

export const baseurl = process.env.BASE_URL;

const axiosInstance = Axios.create({
  baseURL: `${process.env.BASE_URL}/minurl`,
  timeout: 5000
});
export const submitfeedback = async (data) => {
  return await axiosInstance.post('/webapi/feedback/', data)
  .then(response =>{
    if(response.status==200){
      return response.data;
    }
    else{
      throw "error in response"
    }
  })
  .catch(err=>{
    throw err;
  })
}
export const redirectData = async (shortkey) =>{
  return await axiosInstance.get(`/webapi/redirect/${shortkey}`)
  .then( response =>{
      return response.data;
  })
  .catch( err =>{
    throw err
  })
}

export const redirectData_server = async (shortcode) =>{
  return await Axios.get(`http://localhost:3000/minurl/webapi/redirect/${shortcode}`)
  .then( response =>{
      return response.data;
  })
}

export const ogData = async (url) =>{
  return await axiosInstance.get(`/services/ogdata/${url}`)
  .then( response =>{
    if(response.status==200){
      return response.data;
    }
    else{
      throw "error in response"
    }
  })
  .catch( err =>{
    throw err
  })
}
export const queryUrl = async (query) => {
  return await axiosInstance.get(`/webapi/store/${query}`)
  .then( response =>{
    if(response.status==200){
      return response.data;
    }
    else{
      throw "error in response"
    }
  })
  .catch( err =>{
    throw err
  })
}
export const storeUrl = async (data) =>{
  return await axiosInstance.post('/webapi/store',data)
  .then(response =>{
    if(response.status==200){
      return response.data;
    }
    else{
      throw "error in response"
    }
  })
  .catch(err=>{
    throw err;
  })
}
export const getSessionId = async () => {
  return await axiosInstance.get('/webapi/session/')
    .then(response => {
      localStorage.setItem('shrttoken',response.data.token)
      return response
    })
    .catch(err => {
      console.log(err);
      return false
    })
}