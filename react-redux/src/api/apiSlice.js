import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/api/",
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) headers.set("Authorization", `Bearer ${token}`);
            return headers;
        },
    }),
    tagTypes: ["Todos"],
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => "todos",
            providesTags: ["Todos"],
        }),
        getHomePage: builder.query({
            query: () => "",
        }),
        addTodo: builder.mutation({
            query: (newTodo) => ({
                url: "todos",
                method: "POST",
                body: newTodo,
            }),
            invalidatesTags: ["Todos"],
        }),
        deleteTodo: builder.mutation({
            query: (id) => ({
                url: `todos/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Todos"],
        }),
        updateTodo: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `todos/${id}`,
                method: "PATCH",
                body: patch,
            }),
            invalidatesTags: ["Todos"],
        }),
        login: builder.mutation({
            query: (credentials) => ({
                url: "login",
                method: "POST",
                body: credentials,
            }),
        }),
        signup: builder.mutation({
            query: (user) => ({
                url: "signup",
                method: "POST",
                body: user,
            }),
        }),
    }),
});

export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useDeleteTodoMutation,
    useGetHomePageQuery,
    useUpdateTodoMutation,
    useLoginMutation,
    useSignupMutation
} = apiSlice;
