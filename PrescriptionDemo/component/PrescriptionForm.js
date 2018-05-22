import React, { Component } from 'react'
import Axios from 'axios';
import Config from './Config';
import { View, Modal, TouchableHighlight, Text, TextInput, StyleSheet, Picker } from 'react-native'
import { Container, Header, Title, Content, Footer, Button, Left, Right, Body, Icon } from 'native-base';
import { Column as Col, Row } from 'react-native-flexbox-grid';

import { StackNavigator } from 'react-navigation';

import DatePicker from 'react-native-datepicker';
import MultiSelector from './MultiSelector';


const cheifComplains = ['Stomach Ache', 'Store Throat', 'Nausea'];
const diagnosisList = ['Viral Infection', 'Dog Attack', 'Unknown Problem'];
const rxList = ['Napa', 'Viodine', 'Nebicard', 'Omidon'];
const ilnessList = ['Angilok', 'Triopid', 'LeakDat', 'Yaren'];
const investigationList = ['Blood Test', 'X-Ray', 'MRI'];
const adviceList = ['No Junk Foods', ' No Red Meet', 'Do Exercise',];



export default class PrescriptionForm extends Component {
    static navigationOptions = { header: null };

    

    constructor() {
        super();
        this.state = {
            selectedComplains: [],
            selectedDiagnosis: [],
            selectedRx: [],
            selectedIlness: [],
            selectedInvestigate: [],
            selectedAdvice: [],
            modalVisible: false,
            date: null,
            nextApDate: null,
            sex: 'Male',
            doctorName: '',
            patientName: '',
            age: '',
            patientId: ''
        };

    }

    onSelectionsChange = (selectedComplains) => {
        // selectedComplains is array of { label, value }
        this.setState({ selectedComplains })
    };

    onSelectionDiagnosis = (selectedDiagnosis) => {
        this.setState({ selectedDiagnosis });
    };

    onSelectionRx = (selectedRx) => {
        this.setState({
            selectedRx
        })
    };
    onSelectionIlness = (selectedIlness) => {
        this.setState({
            selectedIlness
        })
    };

    onSelectInvestigate = (selectedInvestigate) => {
        this.setState({ selectedInvestigate });
    };

    onSelectAdvice = (selectedAdvice) => {
        this.setState({ selectedAdvice });
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    };

    savePrescription = () => {
        let { 
            selectedComplains, 
            selectedAdvice, 
            selectedDiagnosis,
            selectedIlness,
            selectedInvestigate,
            selectedRx,
            date,
            nextApDate,
            sex,
            doctorName,
            patientName,
            patientId,
            age
        } = this.state;

        selectedComplains =  selectedComplains.map( (v, k) => v.value).toString();
        selectedAdvice =  selectedAdvice.map( (v, k) => v.value).toString();
        selectedDiagnosis =  selectedDiagnosis.map( (v, k) => v.value).toString();
        selectedIlness =  selectedIlness.map( (v, k) => v.value).toString();
        selectedRx =  selectedRx.map( (v, k) => v.value).toString();
        selectedInvestigate = selectedInvestigate.map( (v, k) => v.value).toString();
        let presData = {
            selectedComplains,
            selectedAdvice,
            selectedDiagnosis,
            selectedIlness,
            selectedInvestigate,
            selectedRx,
            date,
            nextApDate,
            sex,
            doctorName,
            patientName,
            patientId,
            age
        };
        if(doctorName !== '' && patientName !== '' && patientId !== ''){
            presData = JSON.stringify(presData);
            let requestUri = Config.apiRoot + 'addPrescription'
            Axios.post(requestUri, {
                prescription_details: presData
            })
            .then((res) => {
                alert(res.data.message)
            })
            .catch((err) => {
                alert("There is something wrong while adding prescription");
            })
        } else {
            alert("Please fill out required fields");
        }

    }

    render() {
        return (
            <Container>
                <Header rounded={true}>
                    <Left>
                        <Button 
                         onPress={() => this.props.navigation.goBack()}
                         transparent
                        >
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body style={{ marginLeft: 50 }}>
                        <Title>Prescription</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={styles.leftRightMargin}>
                    <Row size={12} style={styles.borderBottom}>
                        <Col sm={12}>
                            <Row size={12}>
                                <Col sm={4}>
                                    <Text style={{ marginTop: 15 }} style={styles.titles}>Doctors Names: </Text>
                                </Col>
                                <Col sm={8}>
                                    <TextInput
                                        style={{ height: 40 }}
                                        onChangeText={(doctorName) => {
                                            this.setState({
                                                doctorName
                                            })
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                    <Row size={12} style={styles.textMarginTop} style={styles.borderBottom}>
                        <Col sm={8}>
                            <Row>
                                <Text style={styles.textMarginTop} style={styles.titles}>Patient's Name: </Text>
                                <TextInput
                                    style={{ height: 40, width: 100 }}
                                    onChangeText={(patientName) => {
                                        this.setState({
                                            patientName
                                        })
                                    }}
                                />
                            </Row>
                        </Col>
                        <Col sm={4}>
                            <Row size={6}>
                                <Text style={styles.textMarginTop} style={styles.titles}>Date: </Text>
                                <DatePicker
                                    date={this.state.date}
                                    style={{ width: 80, borderWidth: 0 }}
                                    mode="date"
                                    showIcon={false}
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2018-04-01"
                                    maxDate="2030-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => { this.setState({ date: date }) }}
                                />
                            </Row>

                        </Col>
                    </Row>
                    <Row size={12} style={styles.textMarginTop} style={styles.borderBottom}>
                        <Col sm={4} >
                            <Row>
                                <Text style={styles.textMarginTop} style={styles.titles}>Sex:  </Text>
                                <Text style={styles.textMarginTop}>{this.state.sex}</Text>
                                <Picker
                                    selectedValue={this.state.sex}
                                    style={{ width: 20 }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ sex: itemValue })}>
                                    <Picker.Item label="Male" value="Male" />
                                    <Picker.Item label="Female" value="Female" />
                                </Picker>
                            </Row>
                        </Col>
                        <Col sm={4} >
                            <Row>
                                <Text style={styles.titles}>Age: </Text>
                                <TextInput
                                    style={{ minWidth: 40 }}
                                    keyboardType='numeric'
                                    onChangeText={(age) => {
                                        this.setState({
                                            age
                                        })
                                    }}
                                />
                            </Row>
                        </Col>
                        <Col sm={4} >
                            <Row>
                                <Text style={styles.textMarginTop} style={styles.titles}>ID: </Text>
                                <TextInput
                                    style={{ minWidth: 50 }}
                                    onChangeText={(patientId) => {
                                        this.setState({
                                            patientId
                                        })
                                    }}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Row size={12} style={styles.textMarginTop}>
                        <Col sm={5}>
                            <Row style={styles.textMarginTop} style={{ padding: 20, borderWidth: 1, borderColor: '#ddd', marginBottom: 5 }}>

                                <MultiSelector
                                    items={cheifComplains}
                                    selectedItems={this.state.selectedComplains}
                                    onSelectionsChange={this.onSelectionsChange}
                                    onPlaceData={"Cheif Complains: "}
                                />

                                <Text> {this.state.selectedComplains.map((v, i) => v.value + ', ')} </Text>

                            </Row>
                            <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginBottom: 5 }}>

                                <MultiSelector
                                    items={ilnessList}
                                    selectedItems={this.state.selectedIlness}
                                    onSelectionsChange={this.onSelectionIlness}
                                    onPlaceData={"Pre-Existing Illness: "}
                                />

                                <Text> {this.state.selectedIlness.map((v, i) => v.value + ', ')} </Text>

                            </Row>
                            <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1 }}>

                                <MultiSelector
                                    items={investigationList}
                                    selectedItems={this.state.selectedInvestigate}
                                    onSelectionsChange={this.onSelectInvestigate}
                                    onPlaceData={"Investigations: "}
                                    
                                />

                                <Text> {this.state.selectedInvestigate.map((v, i) => v.value + ', ')} </Text>

                            </Row>
                        </Col>
                        <Col sm={7}>
                            <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginLeft: 5, marginBottom: 5 }}>

                                <MultiSelector
                                    items={diagnosisList}
                                    selectedItems={this.state.selectedDiagnosis}
                                    onSelectionsChange={this.onSelectionDiagnosis}
                                    onPlaceData={"Diagnosis: "}
                                />
                                <Text> {this.state.selectedDiagnosis.map((v, i) => v.value + ', ')} </Text>

                            </Row>
                            <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginLeft: 5, marginBottom: 5 }}>

                                <MultiSelector
                                    items={rxList}
                                    selectedItems={this.state.selectedRx}
                                    onSelectionsChange={this.onSelectionRx}
                                    onPlaceData={"Rx: "}
                                    
                                />
                                <Text> {this.state.selectedRx.map((v, i) => v.value + ', ')} </Text>

                            </Row>
                            <Row style={styles.textMarginTop} style={{ padding: 20, borderColor: '#ddd', borderWidth: 1, marginLeft: 5 }}>

                                <MultiSelector
                                    items={adviceList}
                                    selectedItems={this.state.selectedAdvice}
                                    onSelectionsChange={this.onSelectAdvice}
                                    onPlaceData={"Patient Advice: "}
                                    
                                />
                                <Text> {this.state.selectedAdvice.map((v, i) => v.value + ', ')} </Text>

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
                                <DatePicker
                                    date={this.state.nextApDate}
                                    mode="date"
                                    showIcon={false}
                                    placeholder="select date"
                                    format="YYYY-MM-DD"
                                    minDate="2018-04-01"
                                    maxDate="2030-06-01"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(nextApDate) => { this.setState({ nextApDate: nextApDate }) }}
                                />
                            </Row>
                        </Col>
                    </Row>
                    <Row size={12} style={{ marginTop: 20, marginBottom: 50, borderTopWidth: 2, borderColor: '#ddd', paddingTop: 5 }}>
                        <Text style={styles.titles}>
                            Digital Signature Note:
                        </Text>
                        <View>

                        </View>
                    </Row>
                </Content>

                <Footer style={{ backgroundColor: 'transparent' }}>
                    <Button
                        success={true}
                        iconLeft
                        large
                        full
                        onPress={this.savePrescription}
                    >
                        <Icon name='add' style={{ marginRight: 10, fontSize: 17 }} />
                        <Text style={{ color: '#fff', marginRight: 10 }}>Save</Text>
                    </Button>
                </Footer>

            </Container>
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
        paddingTop: 14
    },
    titles: {
        fontWeight: 'bold',
        color: '#7f7f82'
    }
}
)