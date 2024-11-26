import styles from '@/components/CreateContent/CreateContent.module.css'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/router'

const CreateContent = () => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        title: '',
        platform: '',
        year: '',
        price: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            const response = await axios.post('http://localhost:4000/game', formData)
            if(response.status === 201) {
                // Cria e exibe mensagem de sucesso estilizada
                const successMessage = document.createElement("div")
                successMessage.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background-color: #4CAF50;
                    color: white;
                    padding: 1rem;
                    border-radius: 4px;
                    font-family: 'Poppins';
                    z-index: 1000;
                `
                successMessage.textContent = "Jogo cadastrado com sucesso!"
                document.body.appendChild(successMessage)

                // Remove a mensagem após 3 segundos
                setTimeout(() => {
                    document.body.removeChild(successMessage)
                }, 3000)

                // Limpa o formulário
                setFormData({
                    title: '',
                    platform: '',
                    year: '',
                    price: ''
                })

                // Redireciona para a página home
                router.push('/home')
            }
        } catch (error) {
            console.error('Erro ao cadastrar jogo:', error)
            alert('Erro ao cadastrar jogo. Tente novamente.')
        }
    }

    return(
        <>
        <div className={styles.createContent}>
            <div className="title">
                <h2>Cadastrar novo jogo</h2>
            </div>
            <form id="createForm" className="formPrimary" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Insira o título do jogo"
                    className="inputPrimary"
                    value={formData.title}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="platform"
                    id="platform"
                    placeholder="Insira a plataforma do jogo"
                    className="inputPrimary"
                    value={formData.platform}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="year"
                    id="year"
                    placeholder="Insira o ano do jogo"
                    className="inputPrimary"
                    value={formData.year}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Insira o preço do jogo"
                    className="inputPrimary"
                    value={formData.price}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Cadastrar"
                    id="createBtn"
                    className="btnPrimary"
                />
            </form>
        </div>
        </>
    )
}

export default CreateContent