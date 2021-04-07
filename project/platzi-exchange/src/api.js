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

//exportamos la funcion
export default {
  getAssets,
};
