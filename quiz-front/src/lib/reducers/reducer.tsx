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
        case ACTIONS.ADD_QUESTION: {
            return {...state }
        }
        case ACTIONS.QUIZ_CHANGE: {
            return { ...state, changeQuiz: action.quiz }
        }
        case ACTIONS.QUESTION_CHANGE: {
            return { ...state, changeQuestion: action.question }
        }
        case ACTIONS.CHOICE_CHANGE: {

            return { ...state, changeChoice: action.choice }
        }
        default:
            return { ...state }
    }
}