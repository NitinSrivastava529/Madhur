export class Store {
    autoId: Number;
    storeId: String;
    storeName: String;
    mobile: String;
    address: String;
    city: String;
    state: String;
    pinCode: String;

    constructor() {
        this.autoId = 0;
        this.storeId = "";
        this.storeName = "";
        this.mobile = "";
        this.address = "";
        this.city = "";
        this.state = "";
        this.pinCode = "";
    }
}