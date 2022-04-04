/* Задание 3.

Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат:

Добавить в чат механизм отправки гео-локации:

При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. Сообщение, которое отправит обратно эхо-сервер, не выводить. */

const wsUri = "ws://echo-ws-service.herokuapp.com";


let btnSend = document.querySelector(".btn-send");
let btnLocation = document.querySelector(".btn-location");
let output = document.querySelector(".output");


let websocket = new WebSocket(wsUri);

function writeToScreenServer(message) {
    let writeServer = document.createElement("div");
    writeServer.style.border = "3px solid rgb(120, 217, 247)";
    writeServer.style.width = "fit-content";
    writeServer.style.padding = "10px";
    writeServer.style.margin = "5px";
    writeServer.style.borderRadius = "5px";
    writeServer.innerHTML = message;
    output.appendChild(writeServer);
  }

  function writeToScreenClient(input) {
    let writeClient = document.createElement("div");
    writeClient.style.alignSelf = "end";
    writeClient.style.width = "fit-content";
    writeClient.style.margin = "5px";
    writeClient.style.padding = "10px";
    writeClient.style.borderRadius = "5px";
    writeClient.style.border = "3px solid rgb(120, 217, 247)";
    writeClient.innerHTML = input;
    output.appendChild(writeClient);
  }
  
btnSend.addEventListener('click', () => {
    let input = document.querySelector(".input").value;
      if (!input) {
          return;
      } else {
        websocket.onmessage = function(evt) {
            writeToScreenServer(evt.data);
      }
    };
  websocket.onerror = function(evt) {
    writeToScreenServer(
      '<p style="color: red;">ERROR:</p>' + evt.data
    );
  };

   writeToScreenClient(input);
    websocket.send(input);
  });

  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let messageLocation = `<div>Широта: ${latitude}, Долгота: ${longitude}<br>
    <a href= "https://www.openstreetmap.org/#map=18/${latitude}/${longitude}">
    Ваше положение на карте</a></div>`;
    writeToScreenServer(messageLocation);
}

const error = () => {
    let messageLocation = `<div>Невозможно получить ваше местоположение</div>`;
    writeToScreenServer(messageLocation);
}

  btnLocation.addEventListener ('click', () => {
    if (!navigator.geolocation) {
        let messageLocation = `<div>Ваш браузер не поддерживает геолокацию</div>`;
        writeToScreenServer(messageLocation);
    }   else  {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})




