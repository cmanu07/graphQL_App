import React, { useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_DATA } from '../GraphQL/Queries'


const GetData = () => {

    const {error, loading, data} = useQuery(LOAD_DATA)


useEffect(() => {
    if (data) {
        console.log(data)
    }
}, [data])

  return (
    <div></div>
  )
}

export default GetData