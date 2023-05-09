import {ApiService} from "..";

export default class BraceletApiService extends ApiService {

    constructor(){
        super('/bracelets');
    }

    create(object){
        return this.post('',object,{});
    }

    update(id, object){
        return this.put(`/${id}`, object);
    }

    delete(id){
        super.delete(`/${id}`);
    }

    findByName(params, config){
        return this.get(`/${params}`,config);
    }

    findById(id){
        return this.get(`/${id}`);
    }

    find(config){
        return this.get('',config);
    }

}
