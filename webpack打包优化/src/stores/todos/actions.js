export const addTodo = (params) => {
    return {
        type: "ADD_TODO",
        payload: {
            id: params.id,
            text: params.text,
        }
    }
};


export const toggleTodo = (params) => {
    return {
        type: "TOGGLE_TODO",
    }
};
