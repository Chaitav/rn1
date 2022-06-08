import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: "8"    
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.string,
    category: PropTypes.string
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props){
    super(props);
    console.log('Arc1');
    this.state = {
      articles : [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NEWS`
  }

  updateNews= async () => {
    this.props.setProgress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url)
    this.props.setProgress(40)
    let parsedData = await data.json()
    this.props.setProgress(80)
    this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
    console.log(this.totalResults);
    this.props.setProgress(100)
  }
  async componentDidMount(){
    this.updateNews();
  }
  fetchMoreData = async () => {
    this.setState({page: this.state.page + 1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url)
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles), 
      totalResults: parsedData.totalResults, 
    })
  };
  render() {
    return (
      <>
            <h2 className="text-center" style={{margin: "30px 0px"}} >NEWS - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h2>
            {this.state.loading &&<Spinner />}
            <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} 
            hasMore={this.state.articles.length !== this.state.totalResults} loader={<Spinner />}>
              <div className="container">
                <div className="row">
                  {this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                    <NewsItem title={element.title?element.title:""} description={element.description} 
                        imageUrl={element.urlToImage} newUrl={element.url} 
                        author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div>
                  })}
                </div>
              </div>
            </InfiniteScroll>
      </>
    )
  }
}

export default News