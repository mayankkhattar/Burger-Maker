import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burger-76392-default-rtdb.firebaseio.com/",
});

export default instance;
