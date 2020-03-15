import { IDrone } from "../interface/IDrone";
import dgram from 'dgram';
import { resolve } from "dns";
import { PrintExternal, PrintOk, PrintError } from "../../shared/logger";
const wait = require('waait');
/**
* This class for tello drones and captures the information from Ryze Tello SDK2.0 <br>
* https://dl-cdn.ryzerobotics.com/downloads/Tello/Tello%20SDK%202.0%20User%20Guide.pdf
*/
export class Tello implements IDrone {
    readonly UDP: string = "192.168.10.1";
    readonly PORT: number = 8889;
    private message: string = "";
    private droneConnection: dgram.Socket = dgram.createSocket('udp4');

    /* Command is the intial signal to start the Tello and make it accept other commands */
    async initialize() {
        this.droneConnection.bind(this.PORT);

        // Subscribe to Drone message callback
        this.droneConnection.on("message", message => {
            this.message = `${message}`;
            PrintExternal(`${message}`);
        });

        try {
            await this.fireCommand('command', 600);
        } catch (error) {
            PrintError("Maybe Tello is offline?");
            await this.emergencyExit();
        }


        // In case we get message 'ok' from Tello it means the device is online
        if (this.message === "ok") {
            PrintOk("Tello is Online!");
            try {
                await this.fireCommand('takeoff', 5000);
            } catch (error) {
                await this.emergencyExit();
            }

            try {
                await this.stop();
            } catch (error) {
                console.log(false);
            }
            return true;
        }
       
        // Else we close the connection and showcase error
        else {
            PrintError("Tello is offline");
            this.droneConnection.close();
            return false;
        };
    }

    async stop(): Promise<any> {
        await this.fireCommand('land', 5000);
    }

    private errorHandler(err: any): void {
        if (err instanceof Error) {
            PrintError("Callback failed from Drone! Maybe it's offline?");
        }
    }
    async emergencyExit(): Promise<any> {
        await this.fireCommand('land', 5000);
    }

    private async fireCommand(command: string, delay: number) {
        console.log(`Running Command : ${command}`);
        this.droneConnection.send(command, 0, command.length, this.PORT, this.UDP, this.errorHandler);
        await wait(delay);
    }

    moveToPosition(x: number, y: number, z: number): void {
        throw new Error("Method not implemented.");
    }
    getBattery(): number {
        throw new Error("Method not implemented.");
    }
    getSpeed(): number {
        throw new Error("Method not implemented.");
    }
}