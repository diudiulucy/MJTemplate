const numberRegexp = /^[0-9]+$/;
import {StringValidator} from "./Validation"
class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
        return s.length === 5 && numberRegexp.test(s);
    }
}


export { ZipCodeValidator };
export { ZipCodeValidator as mainValidator };
// export = ZipCodeValidator;