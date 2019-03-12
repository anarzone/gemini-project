import React, { Component } from "react";
import Slider from "react-slick";

import styles from "./homeSlider.module.css";

const settings = {
  autoplay: false,
  stop: true,
  dots: true,
  arrows: true,
  infinite: true,
  speed: 2200,
  slidesToShow: 1,
  slidesToScroll: 1,
  easing: "linear"
};

class HomeSlider extends Component {
  state = {
    showCoverImage: true
  };

  onLoadHandler = () => {
    this.setState({
      showCoverImage: false
    });
  };

  render() {
    return (
      <div className={styles.root}>
        <Slider {...settings}>
          <div>
            <a href="/" className={styles.sliderLink}>
              <div className={styles.overlayBg} />
              <img
                src="/assets/images/slider-1.jpg"
                alt="Slider"
                className={styles.sliderImg}
              />
              {/*<video
           onLoad={this.onLoadHandler}
           loop
           autoPlay
           controls={false}
           className={styles.video}
           src="https://player.vimeo.com/external/303078118.hd.mp4?s=842d79b3b4833f5bd5184eeab27ff9390df070b0&amp;profile_id=175"
         />*/}
              <div className={styles.title}>
                <h6>01 February 2019</h6>
                <h3>
                  The Tulip: a new public cultural and tourist attraction
                  proposed for the City of London
                </h3>
              </div>
            </a>
          </div>
          <div>
            <a href="/" className={styles.sliderLink}>
              <div className={styles.overlayBg} />
              <img
                src="/assets/images/slider-2.jpg"
                alt="Slider"
                className={styles.sliderImg}
              />
              {/*<video
                loop
                autoPlay
                controls={false}
                className={styles.video}
                src="https://player.vimeo.com/external/311936776.hd.mp4?s=3e784fde7cb4003a2ba6bdab65435a63478b535b&amp;profile_id=175"
              />*/}
              <div className={styles.title}>
                <h6>01 February 2019</h6>
                <h3>
                  The Tulip: a new public cultural and tourist attraction
                  proposed for the City of London
                </h3>
              </div>
            </a>
          </div>

          <div>
            <a href="/" className={styles.sliderLink}>
              <div className={styles.overlayBg} />
              <img
                src="/assets/images/slider-3.jpg"
                alt="Slider"
                className={styles.sliderImg}
              />
              {/*<video
            loop
            autoPlay
            controls={false}
            className={styles.video}
            src="https://player.vimeo.com/external/311936776.hd.mp4?s=3e784fde7cb4003a2ba6bdab65435a63478b535b&amp;profile_id=175"
          />*/}
              <div className={styles.title}>
                <h6>01 February 2019</h6>
                <h3>
                  The Tulip: a new public cultural and tourist attraction
                  proposed for the City of London
                </h3>
              </div>
            </a>
          </div>
        </Slider>
      </div>
    );
  }
}

export default HomeSlider;
