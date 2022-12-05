export const initialState = {
    //booleans
    loginModal: false,
    registerModal: false,
    quizModal: false,
    answerModal: false,
    //state
    addQuiz: {
        title: '',
        status: false,
    },
    questions: [{
        title: '',
        choice: [{
            title: '',
            answer: false
        },
        ],
    }],

}