import fetch from 'node-fetch';

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const URL_APIFY = process.env.URL_APIFY;

export async function login() {
  try {
    let login = Buffer.from(`${PUBLIC_KEY}:${PRIVATE_KEY}`).toString('base64');

    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${login}`
      },
      body: JSON.stringify({
        "username": PUBLIC_KEY,
        "password": PRIVATE_KEY
      }),
      redirect: 'follow'
    };

    let response = await fetch(`${URL_APIFY}/login`, requestOptions);
    let result = await response.json();
    return result.token; // Asumiendo que el token está en la propiedad 'token'
  } catch (error) {
    console.error('Error en login:', error);
    throw new Error('Error en login');
  }
}

export async function createSession(token, params) {
  try {
    let requestOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(params),
      redirect: 'follow'
    };

    console.log('Request Options:', requestOptions); // Agregar detalles de depuración

    let response = await fetch(`${URL_APIFY}/payment/session/create`, requestOptions);
    let result = await response.json();
    if (result.data && result.data.sessionId) {
      return result.data.sessionId; // Acceder a sessionId dentro de data
    } else {
      throw new Error(result.message || 'Error desconocido en createSession');
    }
  } catch (error) {
    console.error('Error en createSession:', error);
    throw new Error('Error en createSession');
  }
}