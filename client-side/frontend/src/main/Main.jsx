import React from 'react'
import './Main.css'
import maleIm from '../assets/images/siteimages/male.jfif'
import leatherIm from '../assets/images/siteimages/leather.jfif'
import nikeIm from '../assets/images/siteimages/nike.jfif'
import royalIm from '../assets/images/siteimages/royal.jfif'
import dishIm from '../assets/images/siteimages/dish.jfif'
import laptop2Im from '../assets/images/siteimages/laptop2.jfif'
import laptopIm from '../assets/images/siteimages/royal.jfif'
import fridgIm from '../assets/images/siteimages/fridge.jfif'
import tshirt2Im from '../assets/images/siteimages/tshirt2.avif'
import jeans1Im from '../assets/images/siteimages/jeans1.webp'
import tshirt1Im from '../assets/images/siteimages/tshirt1.avif'


function Main() {
  return (
    <section className="main-section">
      <div className="popular-products">
        <h2>Popular Products</h2>
        <div className="carousel-wrapper">
          <div className="carousel">
            <div className="product">
              <img src={maleIm} alt="male" />
            </div>
            <div className="product">
              <img src={leatherIm} alt="male" />
            </div>
            <div className="product">
              <img src={nikeIm} alt="male" />
            </div>
            <div className="product">
              <img src={royalIm} alt="male" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="box">
          <div className="product-container">
            <img src={dishIm} alt="dish" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="product-container">
            <img src={laptop2Im} alt="dish" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="product-container">
            <img src={laptopIm} alt="dish" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="product-container">
            <img src={fridgIm} alt="dish" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="box">
          <div className="product-container">
            <img src={tshirt2Im} alt="dish" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="product-container">
            <img src={jeans1Im} alt="jeans" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="product-container">
            <img src={tshirt1Im} alt="tshirt" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="product-container">
            <img src={maleIm} alt="dish" />
            <div className="description-container">
              <div className="title">Dinnig Dish</div>
              <div className="price-container">
                <p>White and pleasant Dish for eating and general purpose</p>
                <span className="price">Price:</span>
                <span>12.00 $</span>
              </div>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Main
