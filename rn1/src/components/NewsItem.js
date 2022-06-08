import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newUrl, author, date, source } = this.props
    return (
      <div className="my-3">
          <div className="card">
          <div className="position-absolute   " style={{display: 'flex', justifiedContent: 'flex-end', right: '0'}}>
          <span className="badge rounded-pill bg-danger" style={{left: "90%", zIndex: "1"}}>
            {source}
          </span>
          </div>
            <img src={!imageUrl?"	https://images.news18.com/ibnlive/uploads/2021/12/shutterstock_1246646749-1-164103910716x9.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{description}</p>
                <p className="card-text"><small className="text-muted">
                  By {!author ?"Unknown" : author} on {new Date(date).toGMTString()}</small>
                </p>
                <a rel="noopener noreferrer" href={newUrl} target="_blank" className="btn btn-sm btn-dark">Go somewhere</a>
            </div>
           </div>
      </div>
    )
  }
}

export default NewsItem