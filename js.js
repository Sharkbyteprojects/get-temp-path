/*
 * TMPPATH
 * <c> Sharkbyteprojects
 */
const os = require('os'),//IMPORT OS MODULE -> NEEDED FOR OS DETECTION AND TMPDIR ON OTHER OS THAN WIN
	iswin = os.platform() === "win32",//DETECT PLATFORM
	addon = iswin?require('./build/Release/gtp'):null,//THE ADDON CAN ONLY GENERATED ON WINDOWS -> IT CAN ONLY INCLUDED OVER REQUIRE ON WINDOWS
	crypto = require('crypto'),//CRYPTO LIB, REQUIRED TO GET RANDOM FILE PATH ON OTHER THAN WIN
	path = require("path");//PATH LIB, REQUIRED TO CONCAT PATH ON OTHER THAN WIN
//WIN WITH BINARY (SRC IN THE FILE gtp.cc) calling System API
////MAIN FUNCTION TO GET TMP FILE PATH OR NAME
function windows(tf){
	return tf?addon.getFullTFilePath():addon.gtp();
}

//PURE JS WAY FOR OTHER OS
////FUNCTION THAT HELP TO CREATE A RANDOM FILE NAME
function rvh(len) {
    return crypto.randomBytes(Math.ceil(len/2))
        .toString('hex')
        .slice(0, len);
}
////MAIN FUNCTION TO GET TMP FILE PATH OR NAME
function other(tf){
	return tf?path.resolve(os.tmpdir(), `${rvh(7)}.tmp`):os.tmpdir();
}

//MAIN FUNCTION THAT DECIDE WHAT WILL DO: WIN API OR NODE.JS API
function doDecide(tmpfile){
	if(!iswin){
		return other(tmpfile);
	}else{
		try{
			let winout=windows(tmpfile);
			if(winout.split(" ").join("")==""||winout==undefined){//IF ADDON DOESNT WORK, USE OTHER METHOD ON WIN
				winout=other(tmpfile);                            //*
			}                                                     //*
			return winout;
		}catch(e){
			return other(tmpfile);//IF ADDON DOESNT WORK, USE OTHER METHOD ON WIN
		}
	}
}
//MODULE EXPORT OF "doDecide":
module.exports=doDecide;