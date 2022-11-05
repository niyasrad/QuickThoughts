import React, {Component} from 'react';
import twitter from '../assets/twitter.png';
import youtube from '../assets/youtube.png'

export default class QuoteCard extends Component {

    constructor(props) {
        super(props)
        this.state = {
            json: {},
            title: 'Loading your ching cheng...',
            author: 'Niyas Hameed',
            a: this.findRandom(),
            hreflink: "twitter.com/intent/tweet?text=ShowerThoughts"
        }
        this.handleClick = this.handleClick.bind(this)
    }   
    componentDidMount() {
        fetch(
"https://www.reddit.com/r/showerthoughts/top.json?sort=top&t=week&limit=100")
            .then((res) => res.json())
            .then((json) => {
                this.setState({
                    json: json,
                    title: json["data"]["children"][this.state.a]["data"]["title"],
                    author: json["data"]["children"][this.state.a]["data"]["author"],
                    hreflink: "https://twitter.com/intent/tweet?text="+this.state.title 
                });
            })
    }
    handleClick() {
        let a = this.findRandom()
        this.setState({
            title: this.state.json["data"]["children"][a]["data"]["title"],
            author: this.state.json["data"]["children"][a]["data"]["author"],
            hreflink: "https://twitter.com/intent/tweet?text="+this.state.title  
        })
      }
    findRandom() {
        return Math.floor(Math.random() * 100);
    }
    render() {
        return (
            <div className="card">
                <div className="comparea" id="quote-box">
                    <h1 class="post" id="text"><span>"</span>{this.state.title}"</h1>
                    <h3 class="author" id="author">-{this.state.author}</h3>
                    <button onClick={this.handleClick} id="new-quote">Next Thought.</button>
                    <a href={this.state.hreflink} id="tweet-quote"><img src={twitter} alt="chinesedogsoup"></img></a>
                    <a class="yt" href="https://www.youtube.com/channel/UC8gbepgeQznoLAojDkxtxGA"><img src={youtube}></img></a>

                </div>
            </div>
        )    
    }
}
