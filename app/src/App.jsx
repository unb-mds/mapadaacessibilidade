import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import './App.css'
import { Marker } from 'react-leaflet'   
import { Icon } from 'leaflet' //importa o icone do leaflet, que é a biblioteca que a gente ta usando pra fazer o mapa
import icone from './img/pin.png' 


// ok, pelo que eu entendi, para usar o css e o tailwind, a gente vai precisar jogar TUDO no INDEX.CSS, funciona bonitinho confia no pai

function App() {

  //marcadores
  const markers = [
    {
      geocode: [-15.7942, -47.8822], //coordenadas de Brasília
      name: 'Brasília',
      description: 'Capital do Brasil',
      popUp: 'Brasília é a capital do Brasil e foi inaugurada em 1960. É conhecida por sua arquitetura moderna e planejamento urbano.',
    },
    {
      geocode: [-22.9068, -43.1729], //coordenadas do Rio de Janeiro
      name: 'Rio de Janeiro',
      description: 'Cidade maravilhosa',
      popUp: 'O Rio de Janeiro é famoso por suas praias, como Copacabana e Ipanema, e pelo Cristo Redentor, uma das sete maravilhas do mundo moderno.',
    },
    {
      geocode: [-23.5505, -46.6333], //coordenadas de São Paulo
      name: 'São Paulo',
      description: 'Maior cidade do Brasil',
      popUp: 'São Paulo é a maior cidade do Brasil e um importante centro financeiro e cultural da América Latina.',
    }
  ]
  //aqui a gente vai usar o useState pra guardar os marcadores

  const iconeCustom = new Icon(
    {
      iconUrl: icone, //url do icone
      iconSize: [38, 38], // tamanho do ícone
      
  })


  

  return (
    <MapContainer center={[-15.7942, -47.8822]} zoom={13}> //inicializa o mapa com a latitude e longitude de Brasília, e o zoom inicial
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' //essa url é só pra poder usar o mapa, não precisa se preocupar
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png' 
      />
      {markers.map(marker => (
        <Marker position={marker.geocode} icon={iconeCustom}></Marker>
      ))}
    </MapContainer>
      
     
  )
}

export default App
