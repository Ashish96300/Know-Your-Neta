
export class ApiError extends Error{

    public readonly statusCode :number;
    public readonly errors:unknown[];
    public readonly isOperational:boolean;

    constructor(
        statusCode:number,
        message:string="something went wrong",
        errors:unknown[]=[],
        stack=""
    ){
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.statusCode=statusCode;
        this.errors = errors;
        this.isOperational = true;
    if(stack){
        this.stack=stack;
    }else{
        Error.captureStackTrace(this ,this.constructor)
    }
  }
}
