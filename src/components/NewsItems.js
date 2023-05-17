import React, { Component } from "react";

export default class NewsItems extends Component {
    render () {
        // using js destructuring this.props ma thi title and description aviable kravase.
        let {title, description, imageUrl, newsUrl, author, date, source} = this.props;
        return (
            <div className="my-3">
                <div className="card"> 
                <div style={{display: 'flex', justifyContent: 'center', right: '0', position:'absolute'}}>
                    <span className="badge rounded-pill bg-danger">{source}</span>
                </div>
                    <img src={imageUrl ? imageUrl : 'https://images.hindustantimes.com/tech/img/2023/05/14/cropped/16-9/freeflyer_nasa_960_1684057775190_1684057784801.jpg?impolicy=new-ht-20210112&width=1600'} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-truncate">{title}</h5>
                        <p className="card-text text-truncate">{description}...</p>
                        <p className="card-text"><small className="text-body-secondary">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark btn-sm">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}