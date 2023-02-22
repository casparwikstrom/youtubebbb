import fs from 'fs'
import PageTitle from '@/components/PageTitle'
import generateRss from '@/lib/generate-rss'
import YouTube from 'react-youtube'

const DEFAULT_LAYOUT = 'PostLayout'

function YouTubeVideo({ url }) {
  const videoId = url.split('v=')[1]
  return <YouTube videoId={videoId} />
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3001/api/v1/videos')
  const videos = await res.json()

  return {
    paths: videos.map((video) => ({
      params: {
        id: [video.id.toString()],
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  // Fetch videos from API
  const res = await fetch(`http://localhost:3001/api/v1/videos/${params.id}`)
  const vid = await res.json()

  // rss
  if (vid.length > 0) {
    const rss = generateRss(vid)
    fs.writeFileSync('./public/feed.xml', rss)
  }

  return { props: { vid } }
}

export default function Blog({ vid }) {
  return (
    <>
      <h1>{vid.name}</h1>
      <p>{vid.summary}</p>
      <YouTubeVideo url={vid.url} />
    </>
  )
}
