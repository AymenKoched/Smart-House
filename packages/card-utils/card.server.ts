import axios, { AxiosResponse } from "axios";

export async function sendMessageToCard(ip:string , message : string): Promise<AxiosResponse | void>{
  const port = 80 ;
  const url = `http://${ip}:${port}/read_request`;
  console.log(`message successfully sent ${message}`);
  return await axios.post(url ,{ message });
}