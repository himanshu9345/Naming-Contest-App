import Header from "./Header";
import React from 'react';
import ContestPreview from './ContestPreview';
import data from '../testData.json'

class App extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={test:45}
    // }
    state = {
        pageHeader: 'Naming Contests',
        contests:[]
    };
    componentDidMount(){
        this.setState({
            contests: data.contests
        });
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
