import { combineReducers } from 'redux';
import GetUser from './get_user';
import InvMesg from './inv_msg';
import SucMsg from './suc_msg';
import FacData from './fetchFacData';
import StuData from './fetchStuData';
import SetUpDetails from './setUpdateDetails';
import SetDetails from './setDetails';
import SgUpDetails from './setSignUpDetails';
import FetchMsgData from './fetchMsgData';
import FetchMsgDataF from './fetchMsgDataF';

const rootReducer = combineReducers({
    auth: GetUser,
    invalidMessage: InvMesg,
    successMessage: SucMsg,
    facultyData: FacData,
    studentData: StuData,
    details: SetDetails,
    updetails: SetUpDetails,
    sgupdetails: SgUpDetails,
    msgs: FetchMsgData,
    msgsF: FetchMsgDataF
});

export default rootReducer;