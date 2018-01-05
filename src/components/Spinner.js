import React from 'react'
import {Col, Preloader} from 'react-materialize'

const spinner = () => {
    console.log('in the spinner',this.props)
return (
    <Col s={4}>
        <br />
		<Preloader flashing/>
	</Col>
)}

export default spinner