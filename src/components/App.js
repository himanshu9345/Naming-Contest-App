import Header from "./Header";
import React from 'react';
import ContestPreview from './ContestPreview';
import data from '../testData.json'
import axios from 'axios';

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

    render(){

        return(
            <div className="App">
            <Header msg={this.state.pageHeader} />
            <div>
                {this.state.contests.map(contest =>
                <ContestPreview key={contest.id} {...contest} /> 
                )}
            </div>
            </div>
        );
    }
}


export default App;
