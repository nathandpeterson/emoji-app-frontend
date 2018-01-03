import React from 'react'
import {Col, Preloader} from 'react-materialize'

const spinner = () => (
    <Col s={4}>
        <br />
		<Preloader flashing/>
	</Col>
)

export default spinner