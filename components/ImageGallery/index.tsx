import  ImageGallery  from 'react-image-gallery';
export default function Gallery({isMobile, product}){
    return (<ImageGallery
    showThumbnails={isMobile ? false : true}
    thumbnailPosition={!isMobile ? "left" : "bottom"}
    showBullets={isMobile ? true : false}
    showNav={isMobile ? true : false}
    showPlayButton={false}
    items={product.image.map(image => ({
        original: image,
        thumbnail: image,
    }))} />)
}