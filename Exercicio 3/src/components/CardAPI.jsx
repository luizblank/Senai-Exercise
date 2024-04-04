import style from '../App.module.css'
import { useState } from 'react'

export const CardAPI = ({ name, status, species, type, gender, image }) => {
    const [modalVisible, setModalVisible] = useState(false)

    function ShowModal() {
        if (modalVisible)
            return <ModalAPI />
        return <></>
    }

    function ModalAPI() {
        return (
            <div className={style.modal}>
                <div className={style.modalContent}>
                    <div className={style.titleButton}>
                        <h2>Name: {name}</h2>
                        <button onClick={() => setModalVisible(!modalVisible)}>❌</button>
                    </div>
                    <h2>Status: {status}</h2>
                    <h2>Gender: {gender}</h2>
                    <h2>Species: {species}</h2>
                    <h2>{type}</h2>
                </div>
            </div>
        )
    }

    return (
        <>
            <ShowModal />
            <div className={style.card}>
                <h1>{name}</h1>
                <img src={image} alt={name} width={150} height={"auto"} />
                <button style={style.cardButton} onClick={() => setModalVisible(!modalVisible)}>Info</button>
            </div>
        </>
    )
}