// import axios from "axios";
import { LANGUAGE_VERSIONS } from "./constants";

// const API = axios.create({
//   baseURL: "https://emkc.org/api/v2/piston",
// });

export const executeCode = async (language, sourceCode) => {
  const response = await fetch("https://emkc.org/api/v2/piston/execute", {
    method: "post",
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    },
    
    //make sure to serialize your JSON body
    body: JSON.stringify({
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ]})
    });
    const data = await response.json();
    console.log(`response`, data);
    return data;
};
