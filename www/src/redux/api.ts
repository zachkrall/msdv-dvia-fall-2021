import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const projectApi = createApi({
    reducerPath: 'projectApi',
    baseQuery: fetchBaseQuery({baseUrl: './api/'}),
    endpoints: (builder)=> ({
        getData: builder.query({
            query: () => `projects.json`
        })
    }),
})

export const {useGetDataQuery} = projectApi