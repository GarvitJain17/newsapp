import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'

const News=(props)=> {
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(true)
  const [page,setPage]=useState(1)
  const [totalResults,setTotalResults]=useState(0)

  const UpdateNews=async ()=>{
    props.setprogress(10);
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a9c537de7104b7890eb910b8c100e52&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setprogress(30);
    let data=await fetch(url);
    props.setprogress(70);
    let parsedData =await data.json()
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setprogress(100);
  }
  useEffect(() =>{
    document.title="newsmonkey - "+props.category;
    UpdateNews();
  },[])

  //  const handleprevclick= async()=>{
  //   setPage(page - 1);
  //   UpdateNews();
  // }
  //  const handlenextclick= async()=>{
  //   setPage(page+1);
  //   UpdateNews();
  
  // }
  const fetchMoreData =async () => {
    let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=6a9c537de7104b7890eb910b8c100e52&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data=await fetch(url);
    let parsedData =await data.json()
    setArticles(articles.concat(parsedData.articles))
    setTotalResults(parsedData.totalResults)
    setLoading(false)
  };

    return (
      <>
        <h1 className="text-center" style={{margin:'78px 0px 40px'}}>NewsMonkey Top HeadLines from {props.category}</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !==totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
          {articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title?element.title.slice(0,45):""}
                  description={element.description?element.description.slice(0,88):""}
                  imageurl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                />
              </div>
          })}
        </div>
          </div>
        </InfiniteScroll>
        </>
    )   
    
  }

News.defaultProps={
  country:'in',
  pageSize:8,
  category:'genral',
}
News.propTypes={
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}

export default News;

