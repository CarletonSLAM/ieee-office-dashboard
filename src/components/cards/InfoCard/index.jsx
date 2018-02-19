import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
// import List, { ListItem, ListItemText } from 'material-ui/List'
import Slider from 'react-slick'


const styles = theme => ({
  root: {
  }
})

class GalleryCard extends Component {

  render() {
    const { classes } = this.props
    var sliderSettings = {
      className: classes.root,
      arrows: false,
      dots: false,
      infinite: true,
      speed: 400,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 1000,
      fade: true
    }

    return (
      <Slider {...sliderSettings}>
      <div>ds</div>
      <div>ddd</div>
      <div>dsdsd</div>
      </Slider>
    );
  }
}

export default withStyles(styles)(GalleryCard);
