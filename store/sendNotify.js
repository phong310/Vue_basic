import { createStore } from 'vuex'


export const store = createStore({
    state: () => {
        return {
            // Arr chung
            selectedArr: []
        }
    },
    mutations: {
        // Set
        setSelectUser(state, payload) {
            state.selectedArr = payload
        },
        // Thêm
        addSelectUser(state, data) {
            state.selectedArr.push(data)
        },
        // Xóa
        deleteSelectUser(state, id) {
            state.selectedArr = state.selectedArr.filter((item) => item.id !== id)
        }
    }

})