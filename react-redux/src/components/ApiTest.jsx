import React from 'react'
import { useGetHomePageQuery } from '../api/apiSlice'

const ApiTest = () => {
  const {data} = useGetHomePageQuery();
  return (
    <div>{data}</div>
  )
}

export default ApiTest