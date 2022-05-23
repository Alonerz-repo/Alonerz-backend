'use strict';

const container = document.getElementById('root');
const datetime = document.createElement('div');
datetime.innerHTML = `<p>time: ${new Date()}</p>`;
container.append(datetime);

navigator.geolocation.getCurrentPosition((pos) => {
  const { latitude, longitude } = pos.coords;
  const div = document.createElement('div');
  div.innerHTML = `
  <ul>
    <li>x : ${latitude}</li>
    <li>x : ${longitude}</li>
  </ul>
  `;
  container.append(div);
  console.log(latitude, longitude);
});
