import React, { Component } from "react";

class Meme extends Component {
  constructor() {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      img: "http://i.imgflip.com/1bij.jpg",
      allImgs: [],
    };
  }

  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then((response) => {
        console.log("Parsing");
        return response.json();
      })
      .then((response) => {
        const { memes } = response.data;
        this.setState({ allImgs: memes });
      });
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    console.log("Clicked");
    event.preventDefault();
    const randNum = Math.floor(Math.random() * this.state.allImgs.length);
    const randMemeImg = this.state.allImgs[randNum].url;
    this.setState({ img: randMemeImg });
  };

  render() {
    return (
      <div className="meme">
        <form className="meme-form">
          <input
            name="topText"
            type="text"
            className="form-texts"
            placeholder="Top Text"
            onChange={this.handleChange}
          ></input>
          <input
            name="bottomText"
            type="text"
            className="form-texts"
            placeholder="Bottom Text"
            onChange={this.handleChange}
          ></input>
        </form>

        <form className="meme-form">
          <img
            src={this.state.img}
            alt="meme"
            width="568px"
            height="365px"
            className="meme-image"
          ></img>
          <button className="button" onClick={this.handleClick}>
            {" "}
            Next{" "}
          </button>
          <h2 style={{ color: "white" }} className="superPosed meme-text">
            {" "}
            {this.state.topText}{" "}
          </h2>
          <h2
            style={{ color: "white", marginTop: "20px" }}
            className="meme-text"
          >
            {" "}
            {this.state.bottomText}{" "}
          </h2>
        </form>
      </div>
    );
  }
}

export default Meme;
