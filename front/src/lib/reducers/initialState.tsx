export const initialState = {
    //userid
    user: '',
    //booleans
    loginModal: false,
    registerModal: false,
    quizModal: false,
    answerModal: false,
    openDelete: false,
    answerCheck: [],
    deleteId: '',
    modal: {},
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