import axios from 'axios';
export default {
   get: (path, method, data) => {
       return axios(path, {
           method: method,
           data: data
       }).then((res) => res.json());
   }
};
