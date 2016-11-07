import React from 'react';
import ReactDOM from 'react-dom';
import {Component} from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import DataCard from './datacard.jsx'
var socket = io();
class FileData extends Component{
  constructor(props) {
      super(props);
        
      this.state = {
       totalfile:0,
       data:[],
       data1:[]
      }
   }
componentDidMount() {
    socket.on('file data', function(msg){
    this.state.data1.push(msg)
    this.setState({filename:msg,data:this.state.data1})
  }.bind(this));
socket.on('No of files', function(msg){
    this.setState({totalfile:msg})
    console.log("total file",this.state.totalfile);
  }.bind(this));
    
}
  
render(){
    
    return(
    <MuiThemeProvider>
    <div>
	<AppBar style={{backgroundColor:"#3A606E",textAlign:"center",position: "fixed"}}
      title="Node Socket React React-Infinite-scroller Assignment"
      iconElementLeft={<IconButton></IconButton>}
      /><div style={{paddingTop:"60"}}>
    {this.state.data.length==this.state.totalfile&&this.state.data.length>0?<DataCard data={this.state.data1}/>:<h1>loading</h1>}
	</div>
</div>
</MuiThemeProvider>
);
}
}
ReactDOM.render(
    <FileData/>,document.getElementById('messages')
);