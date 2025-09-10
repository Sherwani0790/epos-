import React from 'react'
import "./loader.scss"
const CustomLoader = () => {
  return (
    <>
      <div className="loader_main_div">
            {/* <img src={loaderGif} alt="Loading..." className="loader_image_width" /> */}
            <div className="loader">
                <div className="dot dot-1"></div>
                <div className="dot dot-2"></div>
                <div className="dot dot-3"></div>
            </div>
        </div> 
    </>
  )
}

export default CustomLoader
