import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export default class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: 'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    async componentDidMount() {
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d59e19d93eb24be8864db42e2b8164e2&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading: true});
        // let data = await fetch(url);
        // let paresedData  = await data.json();
        // this.setState({
        //     articles: paresedData.articles,
        //     totalResults: paresedData.totalResults,
        //     loading: false
        // });
        this.updateNews();
    }

    async updateNews() {
        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        this.props.setProgress(40);
        let paresedData  = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: paresedData.articles,
            totalResults: paresedData.totalResults,
            loading: false,
        });
        this.props.setProgress(100);
    }

    fetchMoreData = async() => {
        this.setState({page: this.state.page +1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let paresedData  = await data.json();
        this.setState({
            articles: this.state.articles.concat(paresedData.articles),
            totalResults: paresedData.totalResults,
        });
    };

    // handlePrevious = async () => {
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d59e19d93eb24be8864db42e2b8164e2&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({loading: true});
    //     // let data = await fetch(url);
    //     // let paresedData  = await data.json();
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: paresedData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({page: this.state.page - 1});
    //     this.updateNews();
    // }
    
    // handleNext = async () => {
    //     // if(!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d59e19d93eb24be8864db42e2b8164e2&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     this.setState({loading: true});
    //     //     let data = await fetch(url);
    //     //     let paresedData  = await data.json();
    //     //     this.setState({
    //         //         page: this.state.page +1,
    //         //         articles: paresedData.articles,
    //         //         loading: false
    //         //     })
    //         // }
    //     this.setState({page: this.state.page + 1});
    //     this.updateNews();
    // }

    render() {
        return (
            <>
                <h1 className="text-center" style={{margin: "30px 0px", marginTop: '90px'}}>NewsMonkey -  Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                {this.state.loading && <Spinner />}
                <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchMoreData} hasMore={this.state.articles.length!== this.state.totalResults} loader={<Spinner />}>
                    <div className="container">
                        <div className="row">
                            {/* {!this.state.loading && this.state.articles.map((element) => { */}
                            {this.state.articles.map((element) => {
                                return <div className="col-md-4" key={element.url}>
                                    <NewsItems title={element.title ? element.title: ''} description={element.description ? element.description : ''} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevious}>&larr; Previous</button>
                    <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)}  type="button" className="btn btn-dark" onClick={this.handleNext}>Next &rarr;</button>
                </div> */}
            </>
        )
    }
}