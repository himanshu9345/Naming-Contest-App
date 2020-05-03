import Header from "./Header";
import React from 'react';
import ContestPreview from './ContestPreview';


class App extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={test:45}
    // }
    state = {
        pageHeader: 'Naming Contests'
    };
    // componentDidMount
    // componentWillUnmount

    render(){

        return(
            <div className="App">
            <Header msg={this.state.pageHeader} />
            <div>
                {this.props.contests.map(contest =>
                <ContestPreview {...contest} /> 
                )}
            </div>
            </div>
        );
    }
}


export default App;
