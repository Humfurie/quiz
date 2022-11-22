import { ACTIONS } from "./actions"
export const reducer = (state: any, action: any) => {
    switch (action.type) {
        case ACTIONS.OPEN_LOGIN_MODAL: {
            return { ...state, loginModal: true }
        }
        case ACTIONS.OPEN_REGISTER_MODAL: {
            return { ...state, registerModal: true }
        }
        case ACTIONS.CLOSE_LOGIN_MODAL: {
            return { ...state, loginModal: false }
        }
        case ACTIONS.CLOSE_REGISTER_MODAL: {
            return { ...state, registerModal: false }
        }
        case ACTIONS.OPEN_QUIZ_MODAL: {
            return { ...state, quizModal: true }
        }
        case ACTIONS.CLOSE_QUIZ_MODAL: {
            return { ...state, quizModal: false }
        }
        default:
            return { ...state }
    }
}