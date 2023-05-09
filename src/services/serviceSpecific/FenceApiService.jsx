import {ApiService} from "..";

export default class FenceApiService extends ApiService{
    constructor(){
        super('/fences');
    }

    create(object){
        return this.post('',object);
    }

    update(id, object){
        return this.put(`/${id}`, object);
    }

    statusActive(id, object){
        return this.patch(`/${id}`, object);
    }

    delete(id){
        super.delete(`/${id}`);
    }

    findById(id){
        return this.get(`/${id}`);
    }

    findByName(params){
        console.log("Entrou no findByName");
        return this.get(`/${params}`);
    }

    find(config){
        return this.get('', config);
    }

}
