const axios = require('axios');
const BACKEND_URL = 'http://localhost:3000';
describe('Authentication', () => {
  test('User Should be able to register', async () => {
    const username = `sandip-${Date.now()}`;
    const password = 'password';
    const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, { username, password });
    expect(response.status).toBe(201);
  });
  // test('Username should be unique', async () => {
  //   const password = 'password';
  //   const response = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, { username: "Sandip", password });
  //   expect(response.status).toBe(201);
  //   const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/auth/signup`, { username: "Sandip", password });
  //   expect(updatedResponse.status).toBe(400);
  // })
});

