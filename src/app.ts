import { Drone } from "./drone";
import { Tello } from "./drone/tello";
import { exists } from "fs";
import { PrintOk, PrintError } from "./shared/logger";


const drone = new Drone(new Tello());
drone.Start()
    .then((res) => {
        if(res === true)
           PrintOk("Launch successfull");
           else
           PrintError("Failed to Launch Drone.")
    });