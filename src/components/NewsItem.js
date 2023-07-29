import React from "react";

const NewsItem=(props)=> {
  
    let { title,description, imageurl, newsurl,author,date } = props;
    return (
      <div>
        <div className="card" style={{ width: "18rem" }}>
          <img
            src={
              !imageurl
                ? "https://www.deccanherald.com/sites/dh/files/articleimages/2023/06/07/stars-istock-1225706-1686146469.jpg"
                : imageurl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
          <div className="card-footer">
            <small className="text-muted">By {author?author:"Unknown"} On {new Date(date).toGMTString()}</small>
          </div>
        </div>
      </div>
    );
 }

export default NewsItem;
