import axios from 'axios';

export async function sendMessageToCard(adresseIp: string, message: string) {
  const port = 80;
  const url = `http://${adresseIp}:${port}/read_request`;
  const response = await axios.post(url, { message });
  console.log(`Message sent successfully: ${message}  `, response.data);
}
