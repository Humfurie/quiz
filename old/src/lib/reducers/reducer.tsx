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
            const newQuestion = state.questions
            questionState.title = action.question
            newQuestion[action.qIdx] = { title: questionState.title, choice: questionState.choice }
            return { ...state, }
        }
        case ACTIONS.EDIT_CHOICE: {
            const questionState = state.questions.find((question: any, id: number) => id === action.qIdx)
            const choiceState = questionState.choice.find((choice: any, id: number) => id === action.cIdx)
            const newChoice = questionState.choice
            console.log(newChoice, 'newChoice')
            console.log(choiceState, 'choiceState')
            choiceState.title = action.choice
            newChoice[action.cIdx] = { title: choiceState.title, answer: choiceState.answer }
            return { ...state }
        }
        case ACTIONS.CHOICE_BUTTON: {
            const newTitle = state.questions[action.qIdx].title
            const newChoice = state.questions[action.qIdx].choice
            state.questions[action.qIdx] = {title: newTitle, choice:[...newChoice, {title:'', answer: false} ]}
            console.log(state.questions[action.qIdx], 'question choice' ,action.qIdx)
            return {
                ...state,
            }
        }
        default:
            return { ...state }
    }
}