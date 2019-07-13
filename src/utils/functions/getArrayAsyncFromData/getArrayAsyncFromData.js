// @flow
import axios from "../../../axiosFaker";

const arrAsyncFromData: Function = (data: Object): any => {
  return data.reduce((arr: Array<string>, item: Object): any => {
    return [...arr, ...(!item.lazy ? [axios.get(item.section)] : [])];
  }, []);
};

export default arrAsyncFromData;
