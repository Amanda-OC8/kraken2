import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import RegisterInfo from './RegisterInfo'
import Signup from './Signup'

import './Register.css'


const Register = props => {


    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1>Vas a entrar en la comunidad de Kraken Worlds Studio</h1>
                        <RegisterInfo title={'¡Te damos la bienvenida!'} text={'Desde el equipo trás este espacio de trabajo, publicación y lectura queremos agradecerte que nos elijas y, ya de paso, contarte un poco lo que vamos a ofrecerte.'} />
                        <RegisterInfo title={'Gran cantidad de mundos para explorar'} text={['Kraken Worlds Studio es una comunidad en constante crecimiento, repleta de talentosos escritores y', < i > worldbuilders </i>, 'dispuestos a deleitarte con lo que se fragua entre sus sienes, tan solo explora un poco o busca tu género favorito y en seguida encontrarás algo que te fascine.']} />
                        <RegisterInfo title={'Un espacio pensado para tu arte, sea cual sea'} text={'Como desarrollador te ofrecemos un espacio polivalente que no sólo hará maravillas con tus novelas y mundos, también con tus guiones, obras de teatro, manuales de rol e incluso proyectos para videojuegos, crea un kraken a gusto de tus necesidades.'} />
                    </Col>
                    <Col className="signup">
                        <Signup/>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Register