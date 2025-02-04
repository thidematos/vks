import { Swiper, SwiperSlide } from "swiper/react";
import StatCard from "../StatCard";

function KDA() {
  return (
    <StatCard label={"KDA"}>
      <Swiper className="swiper">
        <SwiperSlide className="swiper-slide"></SwiperSlide>
      </Swiper>
    </StatCard>
  );
}

export default KDA;
