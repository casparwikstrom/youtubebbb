// fetch videos from http://localhost:3001/api/v1/videos and render them in a list
import React from 'react'
import Link from 'next/link'

const Posts = (props) => (
  <div>
    <h1>My Videos</h1>
    <ul>
      {props.videos.map((video) => (
        <li key={video.id}>
          <Link href="/post/[id]" as={`/post/${video.id}`}>
            <a>{video.name}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
)

Posts.getInitialProps = async function () {
  const res = await fetch('http://localhost:3001/api/v1/videos')
  const data = await res.json()

  console.log(`Show data fetched. Count: ${data.length}`)

  return {
    videos: data,
  }
}

export default Posts
