'use strict';

const container = document.getElementById('root');

navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude, longitude } = pos.coords;
  const div = document.createElement('div');
  div.innerHTML = `
  <ul>
    <li>time: ${new Date()}</li>
    <li>x : ${latitude}</li>
    <li>x : ${longitude}</li>
  </ul>
  `;
  container.append(div);
  console.log(latitude, longitude);
});
