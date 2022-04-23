import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

    static defaultProps={
        country:'in',
        pageSize:3,
        category:'general'
    }
    static propTypes={
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    
    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:true,
            page:1,
            totalResults:0
        }
        document.title=`New Monkey - ${this.props.category.toUpperCase()}`;
    }

    async componentDidMount(){
        this.props.setProgress(10);
        this.setState({loading:true});
        this.setState({});
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63ae42a74809433fa042342c6711152c&page=1&pageSize=${this.props.pageSize}`;    
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            articles:data.articles,
            totalResults:data.totalResults,
            loading:false
        });
        this.props.setProgress(100);
    }

    // handlePrevClick = async ()=>{
    //     this.setState({loading:true});
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63ae42a74809433fa042342c6711152c&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;    
    //     let res = await fetch(url);
    //     let data = await res.json();
    //     this.setState({
    //         articles:data.articles,
    //         page:this.state.page-1,
    //         loading:false
    //     })
          
    //   }
    // handleNextClick = async ()=>{
    //     this.setState({loading:true});
    //     let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63ae42a74809433fa042342c6711152c&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;    
    //     let res = await fetch(url);
    //     let data = await res.json();
    //     this.setState({
    //         articles:data.articles,
    //         page:this.state.page+1,
    //         loading:false
    //     })
    //   }

    fetchMoreData = async () => {
        this.setState({loading:true,page:this.state.page+1});
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=63ae42a74809433fa042342c6711152c&page=${this.state.page}&pageSize=${this.props.pageSize}`;    
        let res = await fetch(url);
        let data = await res.json();
        this.setState({
            articles:this.state.articles.concat(data.articles),
            page:this.state.page+1,
            loading:false
        })
    }
      

  render() {
    return (
        <>
            <div className='container'>
                <h2 className='text-center my-5'>News Monkey || TOP {this.props.category.toUpperCase()} HEADLINES ||</h2>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.props.totalResults}
                    loader={this.state.loading && <Spinner/>}>
                    <div className='container'>
                        <div className="row">
                            {this.state.articles.map((element)=>{
                                return (
                                    <div className="col-md-4" key={element.url}>
                                        <NewsItem title ={element.title?element.title.slice(0,45):""} 
                                        description = {element.description?element.description.slice(0,85):""} 
                                        imgUrl={element.urlToImage?element.urlToImage:"https://www.reuters.com/resizer/iTvn04svWdRW1ZURNlcDKJLr9BM=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/7OFRERUABBOBJEACS57D4AL2DQ.jpg"} 
                                        newsUrl={element.url} 
                                        author={element.author?element.author:"Unknown"} 
                                        date={element.publishedAt?new Date(element.publishedAt).toGMTString():"Today"}
                                        sourceName={element.source.name}
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type='button' className='btn btn-dark' onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type='button' className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </div>
        </>
    )
  }
}

export default News
