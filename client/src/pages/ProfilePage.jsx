import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '@/context/AuthContext'
import { usePost } from '@/context/PostContext'

import Post from '@/components/Post'
import Profile from '@/components/Profile'

function ProfilePage() {
  const { getProfile } = useAuth()
  const { getPosts } = usePost()
  const [profile, setProfile] = useState({})
  const [posts, setPosts] = useState([])
  const params = useParams()

  useEffect(() => {
    async function fetchProfile() {
      if (params.username) {
        const response = await getProfile(params.username)
        setProfile(response)
      }
    }
    async function fetchPosts() {
      const response = await getPosts()
      setPosts(response)
    }
    fetchProfile()
    fetchPosts()
  }, [])

  return (
    <div className="profile-page">
      <div className="profile">
        <h1>Profile</h1>
        <p>Your profile details will be displayed here.</p>
        {Object.keys(profile).length > 0 && <Profile profile={profile} />}
      </div>
      <section className="posts">
        {posts.map((post) => {
          return <Post post={post} key={post._id} />
        })}
      </section>
    </div>
  )
}

export default ProfilePage

// TODO: display user posts
//TODO: logout
// TODO: change profile from an id to an username
