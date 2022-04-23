import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
      let {title,description,imgUrl,newsUrl,author,date,sourceName} = this.props;
    return (
      <div>
            <div className="card" >
                <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                  {sourceName}
                </span>
                <img src={imgUrl} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{description}...</p>
                    <p className="card-text"><small className="text-muted">By {author} On {date}</small></p>
                    <a href={newsUrl} className="btn btn-dark btn-sm" target="_blank" rel='noopener noreferrer'>Read More</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem