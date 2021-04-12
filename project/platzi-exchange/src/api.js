const url = "https://api.coincap.io/v2";
//obtenemos las criptomonedas con el limite de 20
function getAssets() {
  return (
    fetch(`${url}/assets?limit=20`)
      //obtenemos una promesa con los datos y lo convertimos en formato json
      .then((res) => res.json())
      //convertido en json retornamos el objeto data que viene dentro de la respuesta de la promesa
      .then((res) => res.data)
  );
}

//funcion que nos trae una moneda en particular
function getAsset(coin) {
  return fetch(`${url}/assets/${coin}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

//obtenemos el historial de precios de la criptomoneda
function getAssetHistory(coin) {
  const now = new Date(); //hora del momento
  const end = now.getTime(); //timestamp de la fecha de ahora
  now.setDate(now.getDate() - 1); //seteamos a now a la fecha de un dia anterior
  const start = now.getTime(); //valor de ahora menos un dia

  return fetch(
    //history tiene varios intervalo
    `${url}/assets/${coin}/history?interval=h1&start=${start}&end=${end}`
  )
    .then((res) => res.json())
    .then((res) => res.data);
}

//obtenemos las listas de mercados para una moneda en particular
function getMarkets(coin) {
  return fetch(`${url}/assets/${coin}/markets?limit=5`)
    .then((res) => res.json())
    .then((res) => res.data);
}

//obtenemos un exchange particular a partir de un id que puede venir del endpoint de getMarket
function getExchange(id) {
  return fetch(`${url}/exchanges/${id}`)
    .then((res) => res.json())
    .then((res) => res.data);
}

//exportamos la funcion
export default {
  getAssets,
  getAsset,
  getMarkets,
  getExchange,
  getAssetHistory,
};
