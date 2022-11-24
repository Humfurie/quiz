export const initialState = {
    loginModal: false,
    registerModal: false,
    quizModal: false,
    addQuiz: {
        title: 'onetwothree',
        status: true,
        questions: [{
            title: '',
            choice: [{
                title: '',
                answer: true
            },
            {
                title: '',
                answer: false
            }]
        }]
    },
    //inputs
    changeQuiz: '',
    changeQuestion: '',
    changeChoice: ''
}