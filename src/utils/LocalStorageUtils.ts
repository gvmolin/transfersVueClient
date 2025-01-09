export interface IDataItem {
    date: Date,
    query: string,
    info: string
}

export class LocalStorageUtils {
    data: IDataItem[];
    constructor(){
        this.initData();
        this.data = this.mountData();
    }

    clearAll(){
        localStorage.removeItem("history");
        this.initData();
        this.mountData();
    }

    removeOne(){

    }

    initData(){
        let target = localStorage.getItem("history");
        if(!target){
            localStorage.setItem("history", "");
        }
        this.data = this.mountData();
    }

    mountData():IDataItem[] {
        const arr:IDataItem[] = []
        const raw = localStorage.getItem("history");
        const rawArr = raw?.split(";");

        rawArr?.forEach(el => {
            const splitted = el.split(",");

            arr.push({
                date: new Date(splitted[0]),
                query: splitted[1],
                info: splitted[2]
            })
        })

        return arr.filter(el => !!el.query && !!el.info && !!el.date);
    }

    insertData(data: IDataItem){
        let target = localStorage.getItem("history");
        let result = target ? target + `${data.date},${data.query},${data.info};` : `${data.date},${data.query},${data.info};`;

        localStorage.setItem("history", result);
        this.data = this.mountData();
    }

    

}