/**
 * Logs msg in red color
 * @param msg 
 */
export function PrintError(msg : string) : void {
    console.log('\x1b[31m%s\x1b[0m', msg);
}

/**
 * Logs msg in green color
 * @param msg 
 */
export function PrintOk(msg : string) : void {
    console.log('\x1b[32m%s\x1b[0m', msg);
}

/**
 * Logs msg in yellow color
 * @param msg 
 */
export function PrintWarning(msg : string) : void {
    console.log('\x1b[33m%s\x1b[0m', msg);
}

/**
 * Logs msg in cyan color
 * @param msg 
 */
export function PrintExternal(msg : string) : void {
    console.log('\x1b[36m%s\x1b[0m', msg);
}


