/* global: prompt */
import React, { Component } from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'

import './app.css'

const { object } = React.PropTypes

class App extends Component {

	constructor ( props ) {
		super( props )
		this.state = {
			lists: [{
				name: 'ransixi'
			}, {
				name: 'wujingwen'
			}, {
				name: 'huangxiaoming'
			}]
		}
	}

	handleAddIterm () {
		let name = prompt( `what's your name?` )
		if ( name !== '' ) {
			this.setState( {
				lists: this.state.lists.concat( { name } )
			} )
		}
	}
	removeIterm ( name ) {
		this.setState( {
			lists: this.state.lists.filter( l => name !== l.name )
		}, () => this.context.router.push( '/' ) )
	}

	render () {
		const navIterms = this.state.lists.map( ( l, i ) => <li key={i}><Link to={`/${l.name}`}>{l.name}</Link></li> )

		return (
			<div>
				<div className='add'>
					<button onClick={this.handleAddIterm.bind( this )}>添加成员</button>
				</div>
				<ul>
					{navIterms}
				</ul>
				{this.props.children && React.cloneElement( this.props.children, { onRemoveIterm: this.removeIterm.bind( this ) } )}
			</div>
		)
	}
}
App.contextTypes = {
	router: object.isRequired
}

class Detail extends Component {
	remove () {
		this.props.onRemoveIterm( this.props.params.name )
	}
	render () {
		return (
			<div>
				<h2>{this.props.params.name}</h2>
				<button onClick={this.remove.bind( this )}>删除成员</button>
			</div>
		)
	}
}

render(
	<Router history={browserHistory}>
		<Route path='/' component={App}>
			<Route path='/:name' component={Detail} />
		</Route>
	</Router>,
	document.querySelector( '#container' )
)
