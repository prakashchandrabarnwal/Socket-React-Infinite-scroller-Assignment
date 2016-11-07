import React from "react";
import ReactDOM from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {Component} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
injectTapEventPlugin();


class DataCard extends Component{
	constructor(props) {
		super(props);
		this.state={data:this.props.data.sort(),entry:[],hasMoreItems: true,start:0,end:20,items:[],items1:[]}
	}


		test(){
			this.state.entry.map((track,i) => {
            this.state.items.push(
            					 <Card>
										
											<CardHeader
											  title={track.split(":")[0]}
											  
											  actAsExpander={true}
											  showExpandableButton={true}
											/>
							 
											<CardText expandable={true}>
											  {track.split(":")[1]}
											</CardText>
								</Card>
							);
        });
		this.setState({items1:this.state.items})
		}

	 loadItems(page) {
		 
		this.setState({entry:this.state.data.slice(this.state.start,this.state.end)});
		console.log("entry state",this.state.entry);	
		this.setState({start:this.state.start+20});
		this.setState({end:this.state.end+20});
		this.test();
		if(this.state.end>this.state.data.length){
			this.setState({hasMoreItems:false})
		}
		}

	render(){
		return(
			<MuiThemeProvider>
				<InfiniteScroll
								pageStart={0} 
								loadMore={this.loadItems.bind(this)} 
								hasMore={this.state.hasMoreItems} 
								loader={<div className="loader">Loading ...</div>} 
								>
										<div>
										{this.state.items}
									</div> 
				</InfiniteScroll>
			  </MuiThemeProvider>);
	}
}

export default DataCard;