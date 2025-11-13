async function buscarDadosApi(texto) {
    const response = await fetch('https://api.weatherstack.com/current?access_key=736e29f5cc1eab13af3735fd27b73c0e&query='+texto);
    const data = await response.json();
    return data
}

async function buscarPrevisaoDoTempo() {
    let texto = document.getElementById("cidade").value;
    if (texto == "") {
        texto = "fetch:ip";
    }
    const data = await buscarDadosApi(texto);

    document.getElementById('localizacao_atual').innerText = data.location.timezone_id;
    document.getElementById('dataEhora_atual').innerText = data.location.localtime;

    document.getElementById('temperatura').innerText = data.current.temperature;
    document.getElementById('sensacaoTermica').innerText = data.current.feelslike;
    document.getElementById('umidadeAr').innerText = data.current.humidity;
    document.getElementById('velocidadeVento').innerText = data.current.wind_speed;
    document.getElementById('direcaoVento').innerText = data.current.wind_dir;
    document.getElementById('diaSim').innerText = data.current.is_day;
    document.getElementById('icone').src = data.current.weather_icons[0];
    document.getElementById('tempoVariavel').innerText = data.current.weather_descriptions[0];
    if (data.current.is_day == "yes") {
        document.body.style.backgroundImage = "url(images/nuvem.jpg)"
    } else {
        document.body.style.backgroundImage = "url('images/nuvem noite.jpg')"
    }

}
