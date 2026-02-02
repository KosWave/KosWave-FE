import React, { useEffect, useState } from "react";
import apiClient from "~/utils/axios";
import Slider from "react-slick";
import {
  SliderContainer,
  Slide,
  CenteredSlideWrapper,
  CenteredSlideImage,
  CenteredSlideContent,
  Title,
  Channel,
  CustomArrow,
} from "./YoutubeVideo.style";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

export default function YoutubeVideo({ keyword }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [centerSlideIndex, setCenterSlideIndex] = useState(1);

  const darkMode = useSelector((state) => state.theme.darkMode);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await apiClient.get("/api/news/youtube", {

          params: { keyword: keyword, limit: 5 },
        });
        setVideos(response.data.slice(0,5));
        console.log(response.data.slice(0,5));
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [keyword]);

  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    arrows: true,
    prevArrow: <CustomArrow className="slick-prev">Previous</CustomArrow>,
    nextArrow: <CustomArrow className="slick-next">Next</CustomArrow>,
    beforeChange: (current, next) => {
      setCenterSlideIndex((next + 1) % 5);
    },
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  if (loading) return <ClipLoader color="#E56717"></ClipLoader>;
  if (!loading && (error || videos.length === 0))
    return !darkMode ? (
      <img
        style={{ marginLeft: "1rem", width: "100%", height: "100%" }}
        src="/assets/images/undefined-error.svg"
      />
    ) : (
      <img
        style={{ marginLeft: "1rem", width: "100%", height: "100%" }}
        src="/assets/images/undefined-error-darkmode.svg"
      />
    );

  return (
    <SliderContainer>
      <Slider {...settings}>
        {!error &&
          videos.length !== 0 &&
          videos.map((video, index) => (
            <Slide key={video.url}>
              <CenteredSlideWrapper>
                <a href={video.url} target="_blank" rel="noopener noreferrer">
                  <CenteredSlideImage
                    src={video.thumbnail_url}
                    alt={video.title}
                    isCenter={index === centerSlideIndex}
                  />
                </a>
                <CenteredSlideContent isCenter={index === centerSlideIndex}>
                  <Title darkMode={darkMode}>{video.title}</Title>
                  <Channel darkMode={darkMode}>| {video.channel} |</Channel>
                </CenteredSlideContent>
              </CenteredSlideWrapper>
            </Slide>
          ))}
      </Slider>
    </SliderContainer>
  );
}
