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
        case ACTIONS.ADD_QUIZ: {
            return {
                ...state, addQuiz: {
                    title: action.quiz,
                    status: true
                }
            }
        }
        case ACTIONS.INITIAL_QUESTION: {
            return {
                ...state, questions: [...state.questions, {
                    title: '',
                    choice: [{
                        title: '',
                        answer: true
                    }]
                }]
            }
        }
        case ACTIONS.EDIT_QUESTION: {
            const questionState = state.questions.find((question: any, id: number) => id === action.qIdx)

            console.log(state, action.cIdx, 'hawhaw')
            const newQuestion = state.questions

            questionState.title = action.question


            newQuestion[action.qIdx] = { title: questionState.title }
            return {
                ...state, questions: newQuestion
            }
        }
        case ACTIONS.EDIT_CHOICE: {
            state.questions.map
            const choiceState = state.questions.choice.find((choice: any, id: number) => id === action.cIdx)
            console.log(choiceState, 'hawhawdekarabbaw')
            const newChoice = state.questions.choice
            choiceState.title = action.choice
            newChoice[action.cIdx] = { title: choiceState.title, answer: choiceState.answer }
            return { ...state, questions: [...state.questions, { choice: newChoice}] }
        }

        default:
            return { ...state }
    }
}