import Header from "./Header";
import React from 'react';



class App extends React.Component{
    // constructor(props){
    //     super(props);
    //     this.state={test:45}
    // }
    state = {
        pageHeader: 'Naming Contests'
    }
    render(){

        return(
            <div className="App">
            <Header msg={this.state.pageHeader}/>
            <div>
                ....
            </div>
            </div>
        );
    }
}


export default App;
