import { Component } from "react";

import Error from "../Error/Error";

class ErrorBoundary extends Component {
    
    state = {
        error: false
    }
    
    componentDidCatch(error, errorInfo){
        console.log("1)" + error);
        console.log(errorInfo);
        this.setState({
            error: true
        })
    }

    render(){
        if(this.state.error){
            return <Error></Error>
        }
        return this.props.children;
    }
}

export default ErrorBoundary
