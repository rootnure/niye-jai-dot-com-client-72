import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../component/SectionTitle";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useRef, useState } from "react";
import Rider from "./Rider";

const TopRiders = () => {
  const axiosPublic = useAxiosPublic();
  const [isByRating, setIsByRating] = useState(true);
  const topSelectedRef = useRef();
  const { data: topRiders = {} } = useQuery({
    queryKey: ["topRiders"],
    queryFn: async () => {
      const result = await axiosPublic.get("/top-riders");
      return result.data;
    },
  });
  const { byDelivery = [], byRating = [] } = topRiders;

  const handleChange = () => {
    const topBy = topSelectedRef.current.value;
    topBy === "rating" ? setIsByRating(true) : setIsByRating(false);
  };
  return (
    <section className="">
      <SectionTitle heading="Top Delivery Men" subHeading="Best Five" />
      <div className="flex items-center justify-center gap-2">
        <span>Best 5 by: </span>
        <select
          ref={topSelectedRef}
          onChange={handleChange}
          defaultValue="Rating"
          className="px-2 py-0.5 rounded-lg border border-my-primary w-max">
          <option value="rating">Highest Rating</option>
          <option value="delivery">Highest Delivery</option>
        </select>
      </div>
      <div className="my-12" data-aos="fade-up" data-aos-duration="500">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={16}
          slidesPerView={
            window.screen.width < 650 ? 1 : window.screen.width < 1024 ? 2 : 3
          }
          navigation
          pagination={{ clickable: true }}>
          {isByRating
            ? byRating.map((rider) => (
                <SwiperSlide key={rider._id}>
                  <Rider rider={rider} />
                </SwiperSlide>
              ))
            : byDelivery.map((rider) => (
                <SwiperSlide key={rider._id}>
                  <Rider rider={rider} />
                </SwiperSlide>
              ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TopRiders;
