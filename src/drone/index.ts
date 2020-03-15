import { IDrone } from "./interface/IDrone";
import { resolve } from "dns";
import { rejects } from "assert";

export class Drone {
    drona:IDrone;
    isIntialized:boolean = false;
    constructor(drone : IDrone){
        if(drone === undefined || drone === null){
            throw new Error("Please define a drone that implemets IDrone interface");
        }
        else this.drona = drone;
    }

    /**
     * Starts drone and lifts it to inital position
     */
    async Start(): Promise<boolean> {
        this.isIntialized = await this.drona.initialize();
        return this.isIntialized;
    }

    /**
     * Stops Drone and starts soft landing
     */
    async Stop(): Promise<boolean> {
        if(this.isIntialized){
            await this.drona.stop();
        }
        else throw new Error('Drone is not intialized make sure you have started the drone');
        return new Promise<boolean>((res,rej)=>{
            res(this.isIntialized);
            rej("Problem in starting drone");
        });
        };

    /**
     * Takes video input from drone
     * @returns video stream from drone
     */
    StartStreaming() : any{
        if(this.isIntialized){

        }
        else throw new Error('Drone is not intialized make sure you have started the drone');
    }
    /**
     * Stop streaming from drone
     */
    StopStreaming(): void{
        if(this.isIntialized){

        }
        else throw new Error('Drone is not intialized make sure you have started the drone');
    }
    /**
     * Move drone to position 
     * @param `x` linear position forward & backward
     * @param `y` height of the drone defaults to current height
     * @param `z` left and right position of drone
     */
    Move(x: number,y :number ,z :number){
        if(this.isIntialized){
            if(y === undefined || y === 0){
                // use current height
            }
        }
        else throw new Error('Drone is not intialized make sure you have started the drone');     
    }
}