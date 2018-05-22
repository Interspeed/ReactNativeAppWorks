import React, { Component } from 'react'
import {  TouchableHighlight, StyleSheet } from 'react-native';
import Config from './Config';
import Axios from 'axios';
import { Container, Header, Button, Content, List, ListItem, Text, Icon } from 'native-base';
import { Column as Col, Row } from 'react-native-flexbox-grid';
export default class AllPrescriptionList extends Component {
    static navigationOptions = {
        title: 'Prescription List',
        headerStyle: {
            backgroundColor: '#324191',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            color: '#fff',
        },
    };
    constructor(props) {
        super();
        this.state = {
            data: {},
            isloaded: false
        }
    }

    componentDidMount() {
        const requestUri = Config.apiRoot + 'getAllPrescription';

        Axios.get(requestUri)
        .then( (res) => {
            this.setState({
                data: res.data.prescription,
                isloaded: true
            })
        })
        .catch( (err) => {
            alert("Couldn't fetch data from server");
        })

    }

    render() {
        const listData = ['eadkidja', 'dlaosdkas', 'Hd_Empore Domg'];
        let presList = [];

        if(this.state.isloaded) {
            presList = this.state.data.map( (v, k) => {
                return {
                    id: v.id,
                    prescription: JSON.parse(v.prescription_details)
                }
            })
        }
        return (
            <Container>
                <Content>
                    { this.state.isloaded &&
                        <List
                            dataArray={presList}
                            renderRow={(data) => {
                                return (
                                    <Row style={styles.rowWrapper}>
                                        <Text style={styles.listTexts}> Doc: {data.prescription.doctorName + ', Patient: ' + data.prescription.patientName} </Text>
                                        <Icon
                                            onPress={() => {
                                                this.props.navigation.navigate('PrescriptionDetails', {
                                                    presId: data.id
                                                })
                                            }}
                                            style={styles.iconStyle}
                                            name="md-return-right"
                                        />
                                    </Row>
                                );
                            }}

                        />
                    }
                </Content>
            </Container>
        );
    }
}

const styles =  StyleSheet.create({
    rowWrapper: {
        margin: 10, 
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        paddingBottom: 5,

    },
    nextBtn: {
        marginLeft: 40,
        height: 20,
        backgroundColor: '#ddd',
    },
    listTexts: {
        fontSize: 16,
        fontWeight: 'normal'
    },
    iconStyle: {
        color: '#000',
        fontSize: 20,
        backgroundColor: 'transparent',
        padding: 5,
        marginTop: 2,
        display: 'flex',
        justifyContent: 'space-between'
    }
});