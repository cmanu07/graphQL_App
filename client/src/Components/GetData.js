import React, { useState } from 'react'
import { useQuery, gql } from '@apollo/client'
import { LOAD_DATA } from '../GraphQL/Queries'


const GetData = () => {
  // error, loading,
    const { data } = useQuery(LOAD_DATA)
    const [posts, setPosts] = useState(() => [])
    const [yearValue, setYearValue] = useState(() => 0)

    const newDate = (parDate) => new Date (+parDate * 1000)
  
  const handlePosts = () => {
    setPosts(data.allPosts)
  }

  return (
    <section className='graphql-data-section'>
      <h3>Here you can find information about FakerQL posts:</h3>
      <select>
        <option value={0}>Select year:</option>
        <option value={2018}>2018</option>
        <option value={2019}>2019</option>
        <option value={2020}>2020</option>
      </select>
      <button onClick={handlePosts}>Get info</button>
      <div>{
        posts ? posts.map(post => {
          const {createdAt} = post
          const result = newDate(createdAt).getFullYear()
          return <p key={createdAt}>{result}</p>
        })    :   ''
      }</div>
    </section>
  )
}

export default GetData