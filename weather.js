async function buscarDadosApi(texto) {
    const response = await fetch(
        'https://api.weatherstack.com/current?access_key=736e29f5cc1eab13af3735fd27b73c0e&query=' + texto
    );
    const data = await response.json();
    return data;
}

function traduzirDirecao(ingles) {
    const direcoes = {
        N: "Norte",
        S: "Sul",
        E: "Leste",
        W: "Oeste",
        NE: "Nordeste",
        NW: "Noroeste",
        SE: "Sudeste",
        SW: "Sudoeste",
        NNE: "Nor-nordeste",
        ENE: "Lés-nordeste",
        SSE: "Sul-sudeste",
        ESE: "Lés-sudeste",
        SSW: "Sul-sudoeste",
        WSW: "Oés-sudoeste",
        WNW: "Oés-noroeste",
        NNW: "Nor-noroeste"
    };
    return direcoes[ingles] || ingles;
}

function traduzirDescricao(descricao) {
    const mapa = {
        "Sunny": "Ensolarado",
        "Clear": "Céu limpo",
        "Partly cloudy": "Parcialmente nublado",
        "Cloudy": "Nublado",
        "Overcast": "Encoberto",
        "Mist": "Névoa",
        "Patchy rain possible": "Possibilidade de chuva isolada",
        "Rain": "Chuva",
        "Light rain": "Chuva leve",
        "Heavy rain": "Chuva forte",
        "Thunderstorm": "Tempestade",
        "Snow": "Neve",
        "Fog": "Nevoeiro",
        "Haze": "Neblina",
        "Drizzle": "Garoa",
        "Light drizzle": "Garoa leve"
    };

    return mapa[descricao] || descricao;
}

function formatarDataHora(localtime) {
    try {
        const [dataStr, horaStr] = localtime.split(" ");
        const [ano, mes, dia] = dataStr.split("-");
        return `${dia}/${mes}/${ano} - ${horaStr}`;
    } catch {
        return localtime;
    }
}

async function buscarPrevisaoDoTempo() {
    let texto = document.getElementById("cidade").value.trim();
    if (texto === "") {
        texto = "fetch:ip";
    }

    const data = await buscarDadosApi(texto);

    if (!data || data.error) {
        alert(" Cidade não encontrada ou erro na API!");
        return;
    }

    const descricaoTraduzida = traduzirDescricao(data.current.weather_descriptions[0]);
    const direcaoTraduzida = traduzirDirecao(data.current.wind_dir);
    const diaSim = data.current.is_day === "yes" ? "Sim " : "Não ";
    const dataHoraFormatada = formatarDataHora(data.location.localtime);

    document.getElementById('localizacao_atual').innerText = `${data.location.name}, ${data.location.region}, ${data.location.country}`;
    document.getElementById('dataEhora_atual').innerText = dataHoraFormatada;

    document.getElementById('temperatura').innerText = data.current.temperature;
    document.getElementById('sensacaoTermica').innerText = data.current.feelslike;
    document.getElementById('umidadeAr').innerText = data.current.humidity;
    document.getElementById('velocidadeVento').innerText = data.current.wind_speed;
    document.getElementById('direcaoVento').innerText = direcaoTraduzida;
    document.getElementById('diaSim').innerText = diaSim;
    document.getElementById('tempoVariavel').innerText = descricaoTraduzida;
    document.getElementById('icone').src = data.current.weather_icons[0];

    if (data.current.is_day === "yes") {
        document.body.style.backgroundImage = "url('images/nuvem.jpg')";
    } else {
        document.body.style.backgroundImage = "url('images/nuvem noite.jpg')";
    }
}

window.onload = () => buscarPrevisaoDoTempo();
