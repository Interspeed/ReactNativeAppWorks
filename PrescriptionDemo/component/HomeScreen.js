import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Axios from 'axios';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import { Container, Header, Title, Content, Footer, FooterTab, Left, Right, Body, Icon } from 'native-base';

import { View, Modal, Text, TouchableHighlight, Button } from 'react-native'


export default class HomeScreen extends Component {
    static navigationOptions = { header: null };


    render() {
        return (

            <Container>
                <Header>
                    <Body>
                        <Title>Prescription Generator</Title>
                    </Body>
                </Header>
                <Content>
                    <Row size={12} style={{ marginBottom: 10, marginTop: 10, alignSelf: 'center' }}>
                        <Button
                            title="Make New Prescription"
                            onPress={() => this.props.navigation.navigate('PrescriptionForm')}

                        />
                    </Row>
                    <Row size={12} style={{ marginBottom: 10, alignSelf: 'center' }}>
                        <Button
                            title="All Created Prescriptions"
                            onPress={() => this.props.navigation.navigate('PrescriptionList')}
                        />
                    </Row>

                </Content>
            </Container>
        )
    }
}
