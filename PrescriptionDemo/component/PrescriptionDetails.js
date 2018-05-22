import React, { Component } from 'react'
import { View, Modal, TouchableHighlight, Text, TextInput, StyleSheet, Picker } from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon } from 'native-base';
import { Column as Col, Row } from 'react-native-flexbox-grid';
import Config from './Config';
import Axios from 'axios';

import { StackNavigator } from 'react-navigation';

import { MenuProvider } from 'react-native-popup-menu';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

import RNHTMLtoPDF from 'react-native-html-to-pdf';

export default class PrescriptionDetails extends Component {
    static navigationOptions = { header: null };

    constructor() {
        super();
        this.state = {
            data: {},
            isLoaded: false
        };

    }

    async createPDF() {
        let options = {
            html: '<h1>Prescription will be shown here</h1>',
            fileName: 'prescription',
            directory: 'docs',
        };

        let file = await RNHTMLtoPDF.convert(options)
        alert(file.filePath);
    }

    componentDidMount() {
        let presId = this.props.navigation.state.params.presId;
        let requestUri = Config.apiRoot + 'getPrescription?id=' + presId;

        Axios.get(requestUri)
        .then( (res) => {
            this.setState({
                data: JSON.parse(res.data.prescription.prescription_details),
                isLoaded: true
            })
        })
        .catch( (err) => {
            alert("Something went wrong.. prescription wasn't loaded");
        })

    }

    deletePrescription = () => {
        let presId = this.props.navigation.state.params.presId;
        let requestUri = Config.apiRoot + 'deletePrescription?id=' + presId;

        Axios.get(requestUri)
        .then((res) => {
            alert("Prescription Has Been Deleted Successfully");
            this.props.navigation.navigate('PrescriptionList');
        })
        .catch((err) => {
            alert("Something went wrong.. ");
        })
    }

    render() {

        if(!this.state.isLoaded) {
            return <Text> Loading Please wait... </Text>
        }

        let {
            doctorName,
            patientName,
            timestamp,
            selectedComplains,
            selectedAdvice,
            selectedDiagnosis,
            selectedIlness,
            selectedInvestigate,
            selectedRx,
            date,
            nextApDate,
            sex,
            age,
            patientId
        } = this.state.data

        return (
            <MenuProvider>
                <Container>
                    <Header rounded={true}>
                        <Left>
                            <Button
                                onPress={() => this.props.navigation.goBack()}
                                transparent
                            >
                                <Icon name='md-return-left' />
                            </Button>
                        </Left>
                        <Body style={{ marginLeft: 50 }}>
                            <Title>Pres. Details</Title>
                        </Body>
                        <Right>
                            <Button transparent>
                                <Menu>
                                    <MenuTrigger children={<Icon name='ios-options' />} />
                                    <MenuOptions>
                                        <MenuOption onSelect={this.createPDF} text='Generate PDF' />
                                        <MenuOption onSelect={this.deletePrescription} >
                                            <Text style={{ color: 'red' }}>Delete</Text>
                                        </MenuOption>
                                        <MenuOption disabled={true} text='Menu Bottom' />
                                    </MenuOptions>
                                </Menu>
                            </Button>
                        </Right>
                    </Header>
                    <Content style={styles.leftRightMargin}>
                        <Row size={12} style={styles.borderBottom}>
                            <Col sm={12}>
                                <Row size={12}>
                                    <Col sm={4}>
                                        <Text style={{ marginTop: 15 }} style={styles.titles}>
                                            Doctors Name: 
                                        </Text>
                                    </Col>
                                    <Col sm={8}>
                                        <Text style={styles.textMarginTop}> {doctorName }</Text>
                                    </Col>
                                </Row>
                            </Col>

                        </Row>
                        <Row size={12} style={styles.textMarginTop} style={styles.borderBottom}>
                            <Col sm={8}>
                                <Row>
                                    <Text style={styles.textMarginTop} style={styles.titles}>Patient's Name: </Text>
                                    <Text style={styles.textMarginTop}> {patientName}</Text>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <Row size={6}>
                                    <Text style={styles.textMarginTop} style={styles.titles}>Date: </Text>
                                    <Text style={styles.textMarginTop}> {date}</Text>
                                </Row>

                            </Col>
                        </Row>
                        <Row size={12} style={styles.textMarginTop} style={styles.borderBottom}>
                            <Col sm={4} >
                                <Row>
                                    <Text style={styles.textMarginTop} style={styles.titles}>Sex:  </Text>
                                    <Text style={styles.textMarginTop}>{sex}</Text>
                                </Row>
                            </Col>
                            <Col sm={4} >
                                <Row>
                                    <Text style={styles.textMarginTop} style={styles.titles}>Age: </Text>
                                    <Text style={styles.textMarginTop}> {age}</Text>
                                </Row>
                            </Col>
                            <Col sm={4} >
                                <Row>
                                    <Text style={styles.textMarginTop} style={styles.titles}>ID: </Text>
                                    <Text style={styles.textMarginTop}> {patientId}</Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={12} style={styles.textMarginTop}>
                            <Col sm={5}>
                                <Row style={styles.textMarginTop} style={{ padding: 20, borderWidth: 1, borderColor: '#ddd', marginBottom: 5 }}>
                                    <Text style={styles.titles}>
                                        Cheif Complains:
                                    </Text>
                                    <Text> {selectedComplains}</Text>

                                
                                </Row>
                                <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginBottom: 5 }}>
                                    <Text style={styles.titles}>
                                        Pre-Existing Illness:
                                    </Text>
                                    <Text> {selectedIlness}</Text>

                    
                                </Row>
                                <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1 }}>
                                    <Text style={styles.titles}>
                                        Investigations:
                                    </Text>
                                    <Text> {selectedInvestigate}</Text>

                                </Row>
                            </Col>
                            <Col sm={7}>
                                <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginLeft: 5, marginBottom: 5 }}>
                                    <Text style={styles.titles}>
                                        Diagnosis:
                                    </Text>
                                    <Text> {selectedDiagnosis}</Text>
                                   
                                </Row>
                                <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginLeft: 5, marginBottom: 5 }}>
                                    <Text style={styles.titles}>
                                        Rx:
                                    </Text>
                                    <Text> {selectedRx}</Text>
                                    
                                </Row>
                                <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginLeft: 5 }}>
                                    <Text style={styles.titles}>
                                        Patient Advice:
                                    </Text>
                                    <Text> {selectedAdvice}</Text>
                                
                                </Row>
                                <Row style={{
                                    marginTop: 50,
                                    marginLeft: 50,
                                    borderWidth: 1,
                                    borderColor: '#ddd',
                                    padding: 10
                                }}>
                                    <Text style={styles.titles}>
                                        Next Appointment Date:
                                    </Text>
                                    <Text> {nextApDate}</Text>
                                </Row>
                            </Col>
                        </Row>
                        <Row size={12} style={{ marginTop: 35, marginBottom: 50, borderTopWidth: 2, borderColor: '#ddd', paddingTop: 5 }}>
                            <Text style={styles.titles}>
                                Digital Signature Note:
                            </Text>
                        </Row>
                    </Content>

                </Container>
            </MenuProvider>
        )
    }
}

const styles = StyleSheet.create({
    leftRightMargin: {
        marginLeft: 10,
        marginRight: 30,
    },
    textMarginTop: {
        marginTop: 0
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 7,
        paddingTop: 14,
    },
    titles: {
        fontWeight: 'bold',
        color: '#7f7f82'
    }
}
)