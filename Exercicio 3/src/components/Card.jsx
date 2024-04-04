/* eslint-disable react/prop-types */
import style from '../App.module.css'

export const Card = ({name, categoria, status, desc, value, image}) => {
  function ReturnStatus() {
    if (status == true)
      return <>🟢</>
    return <>🔴</>
  }

  return(
      <div className={style.card}>
          <h1>{name} <ReturnStatus/></h1>
          <h2>{categoria}</h2>
          <h2>{desc}</h2>
          <p>{value}</p>
          <img src={image} alt={name} width={150} height={"auto"}/>
      </div>
  )
}