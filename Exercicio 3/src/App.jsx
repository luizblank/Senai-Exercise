import { useState, useEffect } from 'react'
import { Card } from './components/Card'
import { CardAPI } from './components/CardAPI'
import { api } from "./api/rmApi"
import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker } from 'react-leaflet'
import { Popup } from 'react-leaflet'
import produtos from './constants/produtos.json'
import style from './App.module.css'

function App() {
  const position = [-25.42474811725821, -49.27225551560059]
  const [show, setShow] = useState("")
  const [data, setData] = useState([])
  const [page, setPage] = useState("")
  const [character, setCharacter] = useState("")

  useEffect(() => {
    api.get(`/character/?page=${page}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      console.log(response.data.results)
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert('Error: This page could not be found')
        setPage("")
      }
      console.error(error)
    })
  }, [page])

  function searchCharacter(text) {
    setCharacter(text)
    if (character.length <= 0)
      return;

    api.get(`/character/?name=${character}`).then((response) => {
      if (!response.data.results) {
        console.log("Vazio")
      }
      console.log(response.data.results)
      setData(response.data.results)
    }).catch((error) => {
      if (error.response.status === 404) {
        alert('Error: This character could not be found')
        setCharacter("")
      }
      console.error(error)
    })
  }

  return (
    <>
      <div className={style.wrapBtns}>
        <button onClick={() => setShow("prod")}>Produtos</button>
        <button onClick={() => setShow("api")}>API</button>
        <button onClick={() => setShow("map")}>Mapa</button>
      </div>
      <div className={style.wrapPage}>
        <h1>Exercícios de manutenção</h1>
        {show === "prod" &&
          <>
            <h2>Showroom de produtos</h2>
            <div className={style.wrapCards}>
              {produtos.map((item) => {
                return (
                  <Card name={item.name} status={item.status} categoria={item.categoria} desc={item.desc} value={item.value} image={item.image} key={item.id} />
                )
              })}
            </div>
          </>
        }
        {show === "api" &&
          <>
            <h2>Rick and Morty API</h2>
            <div>
              <input type="text" placeholder="1/43" value={page} onChange={(event) => setPage(event.target.value)} />
              <input type="text" placeholder="Rick Sanchez" value={character} onChange={(event) => searchCharacter(event.target.value)} />
            </div>
            <div>
              <div className={style.wrapCards}>
                {data.map((item) => {
                  return (
                    <div key={item.id}>
                      <CardAPI name={item.name} status={item.status} species={item.species} type={item.type} gender={item.gender} image={item.image} />
                    </div>
                  )
                })}
              </div>
            </div>
          </>
        }
        {show === "map" &&
          <>
            <h2>Mapa</h2>
            <MapContainer style={{height: 800}} center={position} zoom={13} scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </>
        }
      </div>
    </>
  )
}

export default App
