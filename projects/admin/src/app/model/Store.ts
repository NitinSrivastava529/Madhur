export class Store {
    autoId: Number;
    storeId: String;
    storeName: String;
    mobile: String;
    address: String;
    city: String;
    state: String;
    pinCode: String;
    type:string

    constructor() {
        this.autoId = 0;
        this.storeId = "";
        this.storeName = "";
        this.mobile = "";
        this.address = "";
        this.city = "";
        this.state = "Select State";
        this.pinCode = "";
        this.type = "Dealer";
    }
}