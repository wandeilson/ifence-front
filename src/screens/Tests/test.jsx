import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import ListTable from 'components/ListTable';
import AlarmApiService from 'services/serviceSpecific/AlarmApiService';
import Card from 'components/Card';



class Test extends Component{

    constructor(){
        super();
        this.service = new AlarmApiService();
        this.state={
            alarms: []
        }
    }

    async componentDidMount() {
        await this.service.find(
            {
                params: {
                    "page": 0,
                    "size": 15,
                    "sort": "id,ASC"
                }
            }
        ).then(response => {
            const alarms = response.data.content;
            this.setState({ alarms });
        }).catch(error => {
        });
    }

    find = async () => {
        var params = '';

        if (this.state.name !== '') {
            params = `search?name=${this.state.name}`;
        }
        await this.service.findByName(params).then(response => {
            const alarms = response.data;
            this.setState({ alarms });
        }).catch(error => {
        });
        
    }

    render(){
        return(
            <div className='row'>
                <Card title = 'notificações ativas'></Card>
            <div className='col-md-12'>
                <div className='bs-component'>
                    <ListTable entity="alarm" data={this.state.alarms}
                    service = {this.service}/>
                </div>
            </div>
            
        </div>
        
        )
    }
}

export default withRouter(Test);
