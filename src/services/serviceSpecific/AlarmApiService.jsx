import {ApiService} from "..";

export default class AlarmApiService extends ApiService{
    constructor(){
        super('/alarms');
    }

    create(object){
        return this.post('',object);
    }

    update(id, object){
        return this.put(`/${id}`, object);
    }

    delete(id){
        super.delete(`/${id}`);
    }

    findById(id){
        return this.get(`/${id}`);
    }

    find(config){
        return this.get('', config);
    }

}