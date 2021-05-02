import { FaWhatsapp } from 'react-icons/fa'
import ImageGallery from 'react-image-gallery';
import api from '../services/api'

import "react-image-gallery/styles/css/image-gallery.css";
import styles from '../styles/product.module.scss'
import Header from '../components/Header';

export default function ProductDetail(props) {
    const { product } = props
    if (!product) {
        return (
            <h1>Produto não encontrado</h1>
        )
    }
    return (
        <>
            <Header openModal={()=>{}} isAdmin={false} />
            <div className={styles.productDetailContainer}>
                {/* <h1>{product.name}</h1> */}
                <div className={styles.galleryContainer}>
                    <ImageGallery
                        showThumbnails={false}
                        showBullets={true}
                        showPlayButton={false}
                        items={product.image.map(image => ({
                            original: image,
                            thumbnail: image,
                        }))} />
                    <div>
                        <h1>{product.name}</h1>
                        <p>
                            <span>a partir de</span>
                            <span className={styles.price}>R$ {product.price}</span>
                        </p>
                    </div>
                </div>
                <div className={styles.info}>
                    <h2>Mais detalhes:</h2>

                    <div>
                        <h3>Cores</h3>
                        <ul className={styles.variations}>
                            <li style={{ background: "#FF6400" }}>Verm</li>
                            <li style={{ background: "#FFD600" }}>Azil</li>
                            <li style={{ background: "#23ff0f" }}>Amar</li>
                            <li style={{ background: "#A8A8B3" }}>Ver</li>
                            <li style={{ background: "#AECFFF" }}>Preto</li>
                            <li style={{ background: "#58be28" }}>Preto</li>
                            <li style={{ background: "#dd00cb" }}>Preto</li>
                        </ul>
                    </div>
                    <div>
                        <h3>Tamanhos e valores:</h3>
                        <p>
                            P - M - G: R$10,00<br />
                        GG: R$13,00
                    </p>
                    </div>
                    <div>
                        <h3>Baixar imagens:</h3>
                        {product.image.map((image, index) => {
                            return (
                                <>
                                    <a 
                                        href={`${image}`} 
                                        download
                                        target="_blank"
                                    >
                                            Imagem {index + 1}
                                    </a>
                                    <br/>
                                </>
                            )
                        })}
                    </div>
                    <div>
                        <h3>Composição:</h3>
                        <p>
                            Confeccionada em malha PV Poliéster 96% com viscose 4% e estampa com sublimação digital.
                    </p>
                    </div>
                    <div>
                        <h3>Medidas</h3>
                        <table>
                            <thead>
                                <tr>
                                    <td>Tamanhos</td>
                                    <td>P</td>
                                    <td>M</td>
                                    <td>G</td>
                                    <td>GG</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Costas</td>
                                    <td>65</td>
                                    <td>69</td>
                                    <td>71</td>
                                    <td>75</td>
                                </tr>
                                <tr>
                                    <td>Frente</td>
                                    <td>65</td>
                                    <td>69</td>
                                    <td>71</td>
                                    <td>75</td>
                                </tr>
                                <tr>
                                    <td>Largura</td>
                                    <td>65</td>
                                    <td>69</td>
                                    <td>71</td>
                                    <td>75</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Valor:</td>
                                    <td>R$ 10</td>
                                    <td>R$ 10</td>
                                    <td>R$ 10</td>
                                    <td>R$ 13</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div>
                        <h3>Formas e prazos de envio:</h3>
                        <p>
                            Envio via correios ou excursão. Prazo de envio de até 8 dias úteis.
                    </p>
                    </div>
                    <a className={styles.buttonContainer} href={`https://api.whatsapp.com/send?phone=${process.env.WHATSAPP_NUMBER}`}>
                        <button type="submit" data-testid="add-food-button">
                            <p className={styles.text}>Enviar pedido no Whatsapp</p>
                            <div className={styles.icon}>
                                <FaWhatsapp size={24} />
                            </div>
                        </button>
                    </a>
                </div>
            </div>
        </>

    )
}

export async function getServerSideProps({ params }) {
    const productID = params.product[1]
    if (productID) {
        const response = await api.get(`/product?id=${productID}`)
        const product = response.data

        return {
            props: { product }
        }
    }
    return {
        props: {}
    }
}