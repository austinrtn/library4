
export default class StateRecorder{
    constructor(objs){
        this.frame = 0;
        this.objs = objs;
        this.data = {

        }
        this.active = true;
    }

    update(){
        if(this.active) this.recordFrame();
    }

    recordFrame(){
        let data = {};
        
        for(let obj of this.objs){
            data['ID:' + obj.id] = {...obj};    
        }

        this.data[this.frame] = data;
        this.frame++;
    }

    getData(obj, dataPoint, perFrame){
        if(!dataPoint) return;
        let data = {};
        for(let i = 0; i < this.frame; i++){
            if(i % perFrame == 0 || !perFrame || perFrame == 0){
                if(obj) {
                    let selectedObj = this.data[i]['ID:' + obj.id];
                    data[i] = selectedObj[dataPoint];                  
                } else {
                        for (const key in this.data[i]) {
                            data[i] = this.data[i][key]
                            data[i][key] = this.data[i][key][dataPoint];
                        }
                    }
                }
            }
        return data;
    }


    stop(){
        this.active = false;
    }
}