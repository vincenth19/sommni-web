import { FC, useState } from "react";
import { Image } from "@mantine/core";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { TImageNode } from "../../types";

interface CarouselProps {
  slides: TImageNode[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          // @ts-ignore
          "--swiper-navigation-size": "2rem", //it works but TS gives error
          "--swiper-pagination-size": "2rem",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.node.url}>
              <Image alt="main-product-image" src={slide.node.url} />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Swiper
        // @ts-ignore
        onSwiper={setThumbsSwiper} //it works but TS gives error
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {slides.map((slide) => {
          return (
            <SwiperSlide key={slide.node.url}>
              <Image
                alt="product-carousel-thumbnail-image"
                src={slide.node.url}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default Carousel;
