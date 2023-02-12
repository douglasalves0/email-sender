export class Logger{

    public static log(message: any){
        this.showDate();
        console.log(`\u001b[34m${message}`);
        this.resetColor();
    }

    public static emphasis(message: string){
        this.showDate();
        console.log(`\u001b[33m${message}`);
        this.resetColor();
    }

    public static error(message: any){
        this.showDate();
        console.log(`\u001b[31m[ERROR] ${message}`);
        this.resetColor();
    }

    public static newMessage(type: string){
        this.showDate();
        console.log(`\u001b[36mNEW MESSAGE ARRIVED(${type.toUpperCase()})`);
        this.resetColor();
    }

    public static showDate(){
        process.stdout.write(`\x1b[32m[${new Date().toLocaleString()}] `);
    }
    
    public static resetColor(){
        process.stdout.write(`\u001b[0m`);
    }

}