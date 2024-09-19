import { sm2 } from 'sm-crypto';
import md5 from 'js-md5';
const publicKye =
	'04743cea5d6be92eb31c7359808c953ae0d6c824cf25ac5de8bcac589ac3caf2a77b568e39651ddf19fe455231eb925878a01e23de1c482ee9598fb40f64f15654';

export const sm2Encrypt = (str) => {
	let encryptPwd = sm2.doEncrypt(str, publicKye); // 加密
	//java 必须是04开头才能解密
	return '04' + encryptPwd;
};

export const md5Encrypt = (str) => {
	return md5(str);
};

export const sm2Decrypt = (str, privateKey) => {
	try {
		if (str.indexOf('04') == 0) {
			str = str.slice(2);
		}
		let encryptPwd = sm2.doDecrypt(str, privateKey); // 解密
		return encryptPwd;
	} catch (error) {
		return null;
	}
};
