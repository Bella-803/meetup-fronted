import React, { Component } from 'react';
import Carousel from "react-bootstrap/Carousel";
import image1 from "../../images/image1.jpg";
import image2 from "../../images/image2.jpg";
import image3 from "../../images/image3.jpg";

class LandingCarousel extends Component {
    render() {
        return (
            <div id="mycarousel" class="carousel slide" data-ride="carousel">
<div class="carousel-inner">
  <div class="carousel-item carousel-image-1 active">
    <div class="dark-overlay">
      <div class="container">
        <div class="carousel-caption d-none d-sm-block mb-5">
          <h1 class="h3">Heading Title</h1>
          <p class="lead">
            Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Quos voluptatibus ullam illo consequatur!
            Inventore, molestiae?
          </p>

          <button
            
            className="btn btn-danger btn-lg"
          >
            Start Group
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="carousel-item carousel-image-2">
    <div class="dark-overlay">
      <div class="container">
        <div class="carousel-caption d-none d-sm-block mb-5">
          <h1 class="h3">Heading Title</h1>
          <p class="lead">
            Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Quos voluptatibus ullam illo consequatur!
            Inventore, molestiae?
          </p>

          <a href="signup.html" class="btn btn-primary btn-lg">
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  </div>

  <div class="carousel-item carousel-image-3">
    <div class="dark-overlay">
      <div class="container">
        <div class="carousel-caption d-none d-sm-block">
          <h1 class="h3">Heading Title</h1>
          <p class="lead">
            Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Quos voluptatibus ullam illo consequatur!
            Inventore, molestiae?
          </p>

          <a href="signup.html" class="btn btn-success btn-lg">
            Sign Up Now
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
        )
    }
}
export default LandingCarousel