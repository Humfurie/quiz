import { ACTIONS } from "./actions"
export const reducer = (state: any, action: any) => {
    switch(action.type){
        case ACTIONS.SET_LOGIN_MODAL: {
            return {...state, setLoginModal: 'action', setRegisterModal: state.setRegisterModal }
        }
        case ACTIONS.SET_REGISTER_MODAL: {
            return {...state, setLoginModal: state.setLoginModal , setRegisterModal: 'action'}
        }
    }
}