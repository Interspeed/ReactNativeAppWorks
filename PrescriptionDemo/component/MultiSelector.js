import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Icon, Button } from 'native-base';
import { View, Modal, Text, TouchableHighlight } from 'react-native'
import SelectMultiple from 'react-native-select-multiple'

const fruits = ['Apples', 'Oranges', 'Pears']

export default class MultiSelector extends Component {
    constructor(props){
        super(props);
        this.state = { 
            modalVisible: false,
         }
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    render() {
        return (
            <View>
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert(' Please click on "Done" Button First.');
                    }}>
                    <View style={{ marginTop: 22 }}>
                        <View>
                            <SelectMultiple
                                items={this.props.items}
                                selectedItems={this.props.selectedItems}
                                onSelectionsChange={this.props.onSelectionsChange} />

                        
                            <Button
                                onPress={() => this.setModalVisible(!this.state.modalVisible)}
                                title="Done"
                                full
                                success
                                
                            >
                                <Text style={{ color: '#fff', fontSize: 17 }}>Done</Text>
                            </Button>
                        </View>
                    </View>
                </Modal>


                <TouchableHighlight
                    onPress={() => {
                        this.setModalVisible(true);
                    }}
                >
                    <Text style={{
                        fontWeight: 'bold',
                        color: '#7f7f82'
                    }}> {this.props.onPlaceData} <Icon style={{
                        color: '#ccc',
                        marginLeft: 15,
                        fontSize: 17,
                        padding: 10
                    }} name="add" /> </Text>
                </TouchableHighlight>


            </View>
        )
    }
}

MultiSelector.propTypes = {
    items: PropTypes.array.isRequired,
    selectedItems: PropTypes.array.isRequired,
    onSelectionsChange: PropTypes.func.isRequired,
    onPlaceData: PropTypes.string

}