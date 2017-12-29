class User {
    private _name:string;
    public constructor(name:string){
        this._name = name;
    }
    public save(func:Function){
        func();
    }
}

export = User;