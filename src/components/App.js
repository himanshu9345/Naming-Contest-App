import Header from "./Header";
import React from 'react';
import data from '../testData.json'
import axios from 'axios';
import ContestList from '../components/ContestList'


const pushState = (obj,url) => {
    window.history.pushState(obj,"",url);
} ;
class App extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={test:45}
    // }
    state = {
        pageHeader: 'Naming Contests',
        contests:this.props.initialContests
    };
    componentDidMount(){
        //do ajax call
        axios.get('/api/contests')
            .then(resp => {
                // console.log(resp.data.contests);
                this.setState({
                    contests: resp.data.contests
                });
            })
            .catch(console.error)
       
    }
    // componentWillUnmount

    fetchContest = (contestId)=>{
        pushState(
            {currentContestId: contestId},
            `/contests/${contestId}`
        );
    };
    render(){

        return(
            <div className="App">
            <Header msg={this.state.pageHeader} />
            <ContestList
            onContestClick = {this.fetchContest}
             contests = {this.state.contests} />
            </div>
        );
    }
}


export default App;
