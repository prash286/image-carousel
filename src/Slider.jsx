import { useEffect, useRef, useState } from "react";
import "./slider-gallary.scss";
import {
  BsChevronLeft,
  BsChevronRight,
  BsPlayCircle,
  BsPlayCircleFill,
} from "react-icons/bs";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { sliderData } from "./sliderData";

export default function Slider() {
  const [width, setWidth] = useState("");
  const [stopSlider, setStopSlider] = useState(false);

  const gallaryContainerRef = useRef();
  const dotNavItems = useRef();
  let timeOut = useRef();
  let currentSlide = useRef(0);
  let translateX = useRef(0);
  let initialTranslateX = 0;

  useEffect(() => {
    gallaryContainerRef.current.children[0]?.classList.add("current");
    dotNavItems.current.childNodes[0].classList.add("current");
    updateWidth();
  }, []);

  function updateWidth() {
    const screenWidth = window.innerWidth;
    setWidth(screenWidth < 734 ? 289 : screenWidth < 1068 ? 704 : 995);
  }

  function calculateInitialTranslateX(index) {
    if (index === 0) return 0;
    if (index === sliderData.length - 1) return -width;
    initialTranslateX = initialTranslateX + width;
    return initialTranslateX;
  }

  function handleSlider(direction) {
    let lastSlide = sliderData.length - 1;
    gallaryContainerRef.current.children[
      currentSlide.current
    ]?.classList.remove("current");
    dotNavItems.current.childNodes[currentSlide.current].classList.remove(
      "current"
    );
    switch (direction) {
      case "previous":
        translateX.current =
          translateX.current - gallaryContainerRef.current.offsetWidth;

        if (currentSlide.current === 0) {
          currentSlide.current = lastSlide;

          gallaryContainerRef.current.children[
            currentSlide.current - 1
          ].style.transform = `translate(-${
            -translateX.current + gallaryContainerRef.current.offsetWidth
          }px, 0px)`;
        } else {
          currentSlide.current = currentSlide.current - 1;

          gallaryContainerRef.current.children[
            currentSlide.current - 1 === -1
              ? lastSlide
              : currentSlide.current - 1
          ].style.transform =
            translateX.current > 0
              ? `translate(${
                  translateX.current - gallaryContainerRef.current.offsetWidth
                }px, 0px)`
              : `translate(-${
                  -translateX.current + gallaryContainerRef.current.offsetWidth
                }px, 0px)`;
        }
        // gallaryContainerRef.current.style.transform = `translate3d(${-translateX}px, 0px, 0px)`;
        break;
      case "next":
        translateX.current =
          translateX.current + gallaryContainerRef.current.offsetWidth;

        // gallaryContainerRef.current.style.transform = `translate3d(${-translateX}px, 0px, 0px)`;
        if (currentSlide.current === lastSlide) {
          currentSlide.current = 0;
          gallaryContainerRef.current.children[
            currentSlide.current + 1
          ].style.transform = `translate(${
            translateX.current + gallaryContainerRef.current.offsetWidth
          }px, 0px)`;
        } else {
          currentSlide.current = currentSlide.current + 1;

          gallaryContainerRef.current.children[
            currentSlide.current + 1 === sliderData.length
              ? 0
              : currentSlide.current + 1
          ].style.transform = `translate(${
            translateX.current + gallaryContainerRef.current.offsetWidth
          }px, 0px)`;
        }
        break;
      default:
        break;
    }
    gallaryContainerRef.current.style.transform = `translate3d(${-translateX.current}px, 0px, 0px)`;
  }

  function handleDotNavTabClick(slideNum) {
    setStopSlider(true);
    if (currentSlide.current + 1 === slideNum) {
      handleSlider("next");
    } else if (currentSlide.current - 1 === slideNum) {
      handleSlider("previous");
    } else if (
      currentSlide.current + 1 !== slideNum &&
      currentSlide.current + 1 < slideNum
    ) {
      let currTransX = translateX.current;
      gallaryContainerRef.current.children[
        currentSlide.current
      ]?.classList.remove("current");
      dotNavItems.current.childNodes[currentSlide.current].classList.remove(
        "current"
      );
      for (
        let index = currentSlide.current + 1;
        index <= slideNum + 1;
        index++
      ) {
        currTransX = currTransX + gallaryContainerRef.current.offsetWidth;
        index === 11
          ? setTimeout(() => {
              gallaryContainerRef.current.children[0].style.transform = `translate(${currTransX}px, 0px)`;
            }, 150)
          : (gallaryContainerRef.current.children[
              index
            ].style.transform = `translate(${currTransX}px, 0px)`);
      }
      gallaryContainerRef.current.style.transform = `translate3d(${-(
        currTransX - gallaryContainerRef.current.offsetWidth
      )}px, 0px, 0px)`;
      currentSlide.current = slideNum;
      translateX.current = currTransX - gallaryContainerRef.current.offsetWidth;
    } else if (
      currentSlide.current - 1 !== slideNum &&
      currentSlide.current - 1 > slideNum
    ) {
      let currTransX = translateX.current;

      gallaryContainerRef.current.children[
        currentSlide.current
      ]?.classList.remove("current");
      dotNavItems.current.childNodes[currentSlide.current].classList.remove(
        "current"
      );
      for (
        let index = currentSlide.current - 1;
        index >= slideNum - 1;
        index--
      ) {
        currTransX = currTransX - gallaryContainerRef.current.offsetWidth;
        index === -1
          ? setTimeout(() => {
              gallaryContainerRef.current.children[
                sliderData.length - 1
              ].style.transform = `translate(${currTransX}px, 0px)`;
            }, 150)
          : (gallaryContainerRef.current.children[
              index
            ].style.transform = `translate(${currTransX}px, 0px)`);
      }
      gallaryContainerRef.current.style.transform = `translate3d(${-(
        currTransX + gallaryContainerRef.current.offsetWidth
      )}px, 0px, 0px)`;
      currentSlide.current = slideNum;
      translateX.current = currTransX + gallaryContainerRef.current.offsetWidth;
    }
  }

  return (
    <main className="slider-box">
      <section
        className="gallary-container"
        style={{
          transform: "translate3d(0px, 0px, 0px)",
          transition: "transform 1s cubic-bezier(0.645, 0.045, 0.355, 1) 0s",
        }}
        ref={gallaryContainerRef}
      >
        {sliderData.map((item, index) => {
          const translateX = calculateInitialTranslateX(index);
          return (
            <div
              className="gallary-item"
              style={{
                transform: `translate(${translateX}px,0px)`,
                zIndex: 1,
              }}
              key={item.title}
              onTransitionEnd={() => {
                setTimeout(() => {
                  gallaryContainerRef.current.children[
                    currentSlide.current
                  ]?.classList.add("current");
                }, 150);
                dotNavItems.current.childNodes[
                  currentSlide.current
                ].classList.add("current");
                clearTimeout(timeOut.current);
                timeOut.current = !stopSlider
                  ? setTimeout(() => {
                      handleSlider("next");
                    }, 1500)
                  : "";
              }}
            >
              <a
                href={item.playUrl}
                style={{
                  backgroundImage:
                    width !== 289 ? item.imgUrl : item.imgUrlMobile,
                  backgroundPosition:
                    width === 289 &&
                    item.textLogo === "url(messi-text.jpg)" &&
                    "right",
                }}
                className="gallary-item-image"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="inner">
                  <div className="item-top-info">
                    <figure
                      className="atv-plus-icon"
                      style={{
                        backgroundImage: item.atvPlusIcon,
                        mixBlendMode:
                          item.textLogo === "url(messi-text.jpg)" &&
                          "difference",
                      }}
                    ></figure>
                    <figure
                      className="logo"
                      style={{
                        backgroundImage: item.textLogo,
                      }}
                    ></figure>
                  </div>
                  <div className="item-bottom-info">
                    <div className="custom-button">
                      <span>{item.play}</span> <BsPlayCircleFill />
                    </div>
                    <p className="typography">
                      <span style={{ fontWeight: 700 }}>{item.genre}</span>
                      <span style={{ padding: "0px 4px" }}>.</span>
                      {item.title}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          );
        })}
      </section>
      <div className="slider-change">
        <div
          className="previous"
          onClick={() => {
            setStopSlider(true);
            handleSlider("previous");
          }}
        >
          <BsChevronLeft />
        </div>
        <div
          className="next"
          onClick={() => {
            setStopSlider(true);
            handleSlider("next");
          }}
        >
          <BsChevronRight />
        </div>
      </div>
      <div className="tablist-wrapper">
        <div className="dotnav">
          <ul className="dotnav-items" ref={dotNavItems}>
            {sliderData.map((_, index) => (
              <li
                key={index}
                className="dotnav-item"
                onClick={() => handleDotNavTabClick(index)}
              />
            ))}
          </ul>
        </div>
      </div>
      <button className="auto-slider-button">
        {stopSlider ? (
          <BsPlayCircle
            onClick={() => {
              setStopSlider(false);
              handleSlider("next");
            }}
          />
        ) : (
          <AiOutlinePauseCircle
            onClick={() => {
              clearTimeout(timeOut.current);
              setStopSlider(true);
            }}
          />
        )}
      </button>
    </main>
  );
}
