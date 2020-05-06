import Header from "./Header";
import React from 'react';
import ContestList from '../components/ContestList'
import Contest from '../components/Contest'
import * as api from '../api';
import PropTypes, { number } from 'prop-types';
;

const pushState = (obj,url) => {
    window.history.pushState(obj,"",url);
} ;


const onPopState = handler => {
    window.onpopstate=handler;
};
class App extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={test:45}
    // }
    static propTypes ={
        initialData: PropTypes.object.isRequired
    }
    state = this.props.initialData;
    componentDidMount(){
        onPopState((event)=>{
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        })
        //do ajax call
        // axios.get('/api/contests')
        //     .then(resp => {
        //         // console.log(resp.data.contests);
        //         this.setState({
        //             contests: resp.data.contests
        //         });
        //     })
        //     .catch(console.error)
       
    }
    componentWillUnmount(){
        onPopState(null);
    }

    fetchContest = (contestId)=>{
        pushState(
            {currentContestId: contestId},
            `/contest/${contestId}`
        );
        //lookup the contest
        api.fetchContest(contestId).then(contest=>{
            this.setState({
                pageHeader: contest.contestName,
                currentContestId: contest.id,
                contests: {
                    ...this.state.contests,
                    [contest.id]: contest
                }

            });
        });
        
    };

    fetchContestList = ()=>{
        pushState(
            {currentContestId: null},
            `/`
        );
        //lookup the contest
        api.fetchContestList().then(contests=>{
            this.setState({
                currentContestId: null,
                contests

            });
        });
        
    };


    currentContest(){
        return this.state.contests[this.state.currentContestId];
    }

    pageHeader(){
        if(this.state.currentContestId){
            return this.currentContest().contestName;
        }
        return 'Naming Contests';
    }
    currentContent(){
        if (this.state.currentContestId){
            return <Contest contestListClick={this.fetchContestList} {...this.currentContest()} />
        }
        return <ContestList
        onContestClick = {this.fetchContest}
        contests = {this.state.contests} />
    }
    render(){

        return(
            <div className="App">
            <Header msg={this.pageHeader()} />
            {this.currentContent()}
            </div>

        );
    }
}


export default App;
