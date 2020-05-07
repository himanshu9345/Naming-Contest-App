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

    static propTypes ={
        initialData: PropTypes.object.isRequired
    }
    state = this.props.initialData;
    componentDidMount(){
        onPopState((event)=>{
            this.setState({
                currentContestId: (event.state || {}).currentContestId
            })
        console.log((event.state || {}).currentContestId)
        console.log("did mount")


        })
       
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

    fetchNames = (nameIds) => {
        if (nameIds.length===0){
            return
        }
        api.fetchNames(nameIds).then(names=>{
            this.setState({
                names
            })
        })
    }

    lookupName = (nameId) => {
        if (!this.state.names||!this.state.names[nameId]){
            return {
                name: '....'
            };
        }

        return this.state.names[nameId];
    }

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
        console.log(this.state.currentContestId)
        if (this.state.currentContestId){
        console.log("ggg")
            return <Contest 
            contestListClick={this.fetchContestList} 
            fetchNames={this.fetchNames} 
            lookupName = {this.lookupName}
            {...this.currentContest()} />
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
