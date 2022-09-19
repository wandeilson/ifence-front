import {ApiService} from "..";

export default class UserApiService extends ApiService{

    constructor(){
        super('/users');
    }

    create(body){
        return this.post('', body);
    }

    update(id, body){
        return this.put(`/${id}`, body);
    }

    updateName(body){
        return this.patch(`/user`, body);
    }

    delete(id){
        super.delete(`/${id}`);
    }

    find(params, config){
        return this.get(`/${params}`, config);
    }
}
