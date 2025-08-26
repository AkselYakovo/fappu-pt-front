import { Carousel } from 'react-bootstrap'
import image_1 from '../assets/pic_1.jpg'
import image_2 from '../assets/pic_2.jpg'

function SpotlightCarousel() {
  return (
    <Carousel>
      <Carousel.Item>
        <img src={image_1} alt="" />
        <Carousel.Caption>
          <h5>Amazing Bobas</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            laborum
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img src={image_2} alt="" />
        <Carousel.Caption>
          <h5>Amazing Lolas</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae,
            laborum
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default SpotlightCarousel
