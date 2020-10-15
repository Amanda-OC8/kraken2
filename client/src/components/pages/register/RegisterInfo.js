import React from 'react'

import Container from 'react-bootstrap/Container'
import './Register.css'

const RegisterInfo = props => {

    return (

        <>
            <Container>
                <div className='register-box' >
                    <h3>
                        {props.title}
                    </h3>
                    <p>{props.text}</p>
                </div>
            </Container>
        </>
    )
}

export default RegisterInfo