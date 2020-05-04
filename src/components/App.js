import Header from "./Header";
import React from 'react';
import data from '../testData.json'
import axios from 'axios';
import ContestList from '../components/ContestList'

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
            <ContestList contests = {this.state.contests} />
            </div>
        );
    }
}


export default App;
