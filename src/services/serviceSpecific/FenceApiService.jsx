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

    find(config){
        return this.get('', config);
    }

}
