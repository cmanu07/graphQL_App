import React, { useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { useQuery } from '@apollo/client'
import { LOAD_DATA } from '../GraphQL/Queries'
import { Group } from '@visx/group'
import { Pie } from '@visx/shape'
import { Text } from '@visx/text'

const postData = [
  {monthIndex: 0, month: 'January', nrOfPosts: 0, chartColor: '#FFDB70'},
  {monthIndex: 1, month: 'February', nrOfPosts: 0, chartColor: '#74BDE0'},
  {monthIndex: 2, month: 'March', nrOfPosts: 0, chartColor: '#3B7197'},
  {monthIndex: 3, month: 'April', nrOfPosts: 0, chartColor: '#A1EAD6'},
  {monthIndex: 4, month: 'May', nrOfPosts: 0, chartColor: '#F8D49A'},
  {monthIndex: 5, month: 'June', nrOfPosts: 0, chartColor: '#9733EE'},
  {monthIndex: 6, month: 'July', nrOfPosts: 0, chartColor: '#FC8571'},
  {monthIndex: 7, month: 'August', nrOfPosts: 0, chartColor: '#FEFEFE'},
  {monthIndex: 8, month: 'September', nrOfPosts: 0, chartColor: '#B5AC49'},
  {monthIndex: 9, month: 'October', nrOfPosts: 0, chartColor: '#D7415D'},
  {monthIndex: 10, month: 'November', nrOfPosts: 0, chartColor: '#00E0C6'},
  {monthIndex: 11, month: 'December', nrOfPosts: 0, chartColor: '#41436A'},
]


const GetData = () => {

    const { data } = useQuery(LOAD_DATA)
    const [posts, setPosts] = useState(() => [])
    const [loader, setLoader] = useState(() => false)

    
    // VISX Chart
    const [activePieBar, setActivePieBar] = useState(() => '')
    const [postsNr, setNrPosts] = useState(() => 0)
    
    const newDate = (parDate) => new Date (+parDate * 1000)
   
      if (postsNr === 0) {
        let result = posts.map(post => {
          const { createdAt } = post
          // here I implement the condition for the year to be bigger then 51900 because of the missing year information
          const rez = (newDate(createdAt).getFullYear() > 51900) ? newDate(createdAt).getMonth() : null    
          return rez
        })
        for (let field of postData) {
          for (let p of result) {
            if (p === field.monthIndex) field.nrOfPosts++ && setNrPosts(field.nrOfPosts)
          }
        }
      }

    const handlePosts = () => {
      setLoader(true)
      
      if (data) {
        setPosts(data.allPosts)
        setLoader(false)
      }
    }

  return (
    <section className='graphql-data-section'>
      <h3>Here you can find information about FakerQL posts:</h3>
      {/* here I want to give the option to select the year if the data was in the right format */}
      <select>
        <option value={0}>Select year:</option>
        <option value={2018}>2018</option>
        <option value={2019}>2019</option>
        <option value={2020}>2020</option>
      </select>
      <button onClick={handlePosts}>{
        loader ? <ClipLoader color={'#FFFFFF'} loading={loader} size={30}/> : "Get info"
      }
      </button>
      <div>
        {
          posts.length > 0 ? <svg width={300} height={300}>
                    <Group top={155} left={155}>
                      <Pie
                          data={postData}
                          pieValue={data => data.nrOfPosts}
                          outerRadius={145 - 2}
                          innerRadius={({data}) => {
                            const size = activePieBar && activePieBar.month === data.month ? 28 : 14
                            return 145 - size
                          }}
                          padAngle={0.02}
                      >
                        {
                          pie => {
                            return pie.arcs.map((arc) => {
                              return <g key={arc.data.monthIndex}
                                        onMouseEnter={() => setActivePieBar(arc.data)}
                                        onMouseLeave={() => setActivePieBar(null)}
                                        
                                    >
                                <path d={pie.path(arc)} fill={arc.data.chartColor} className='pie-bar'></path>
                              </g>
                            })
                          }
                        }
                      </Pie>
                      {
                        activePieBar ? <>
                                        <Text textAnchor='middle' fill='#C4E8C2' fontSize={22} dy={-52} className='pie-text-field'>
                                          {`In ${activePieBar.month}`}
                                        </Text>
                                        <Text textAnchor='middle' fill='#FFFFFF' fontSize={38} dy={2} className='pie-text-field'>
                                          {activePieBar.nrOfPosts}
                                        </Text>
                                        <Text textAnchor='middle' fill='#C4E8C2' fontSize={22} dy={32} className='pie-text-field'>
                                          posts
                                        </Text>
                                      </>
                                    : <>
                                        <Text textAnchor='middle' fill='#FFFFFF' fontSize={38} dy={-22} className='pie-text-field'>
                                          {postData.reduce((a, p) => a + p.nrOfPosts, 0)}
                                        </Text>
                                        <Text textAnchor='middle' fill='#C4E8C2' fontSize={22} dy={22} className='pie-text-field'>
                                          total posts
                                        </Text>
                                      </>
                      }
                    </Group>
                  </svg>
                :                             ''
        }
      </div>
    </section>
  )
}

export default GetData