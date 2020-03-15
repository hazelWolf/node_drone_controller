/**
 * All drones must implement this interface as application can easily switch between drones via this interface
 */
export interface IDrone{
    readonly UDP : string;
    readonly PORT:number;

    /**
     * Intialize the drone in this method get the connection up and running
     * @returns state of connection
     */
     initialize (): Promise<boolean> ;

     stop (): Promise<boolean> ;


    /**
     *  All drones should have an emergency exit for safe landing in case connection is sabotaged. <br>
     *  Stops motors immediately
     * */ 
    emergencyExit() : void;

    /**
     *  Move the drone to position
     * @param x `motion position` forward & backward
     * @param y `height` of the drone defaults to current height
     * @param z `directional position` left and right position of drone
     */
    moveToPosition(x:number, y:number, z:number): void;

    /**
     * Get battery left in drone
     * @returns battery percentage `0-100`
     */
    getBattery(): number;

    /**
     * Get speed of the drone 
     * @returns speed in `0-100` (cm/s)
     */
    getSpeed(): number;

    /**
     * 
     */

}