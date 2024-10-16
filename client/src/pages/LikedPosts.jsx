import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Post from '@/components/Post'
import Profile from '@/components/Profile'
import NavBar from '@/components/NavBar'
import NotFoundPage from './NotFoundPage'

function LikedPostsPage() {
  const { getProfile, errors } = useAuth()
  const [profile, setProfile] = useState({})
  const [likedPosts, setLikes] = useState([])
  const [profileErrors, setErrors] = useState([])
  const params = useParams()

  useEffect(() => {
    async function fetchProfile() {
      if (params.username) {
        const response = await getProfile(params.username)
        if (response) {
          setLikes(response.likes)
          setProfile(response)
        }
      }
    }
    fetchProfile()
  }, [])

  useEffect(() => {
    if (errors.length !== 0) setErrors(errors)
  }, [errors])

  return (
    <>
      {profileErrors.length !== 0 ? (
        <NotFoundPage />
      ) : (
        <>
          <NavBar />
          <div className="pb-16 w-full md:absolute md:left-48 md:top-0 md:w-[calc(100%-12rem)] md:h-full flex flex-col items-center justify-start">
            <div className="profile">
              {Object.keys(profile).length > 0 && <Profile profile={profile} />}
            </div>
            <section className="posts">
              {likedPosts.length == 0 && <p>No posts liked yet</p>}
              {likedPosts.length > 0 &&
                likedPosts.map((post) => <Post post={post} key={post._id} />)}
            </section>
          </div>
        </>
      )}
    </>
  )
}

export default LikedPostsPage
