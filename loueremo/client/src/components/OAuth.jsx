// import { FcGoogle } from "react-icons/fc"
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase-auth'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

export default function OAuth() 
{
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleGoogleClick = async () => 
    {
        try 
        {
          const provider = new GoogleAuthProvider()
          const auth = getAuth(app) 
          
          const result = await signInWithPopup( auth, provider )
          // console.log(result.user);
          const res = await fetch('/api/auth/google', {
            method: 'POST',
            headers: { ContentType: 'application/json'},
            body: JSON.stringify({
                name: result.user.displayName,
                eamil: result.user.email,
                photo: result.user.photoUrl
            })
          })
          const data = await res.json()
          dispatch(signInSuccess(data))
          navigate('/')
        } catch (error) {
          console.log('ConneXion Impossible via Google')  
        }
    }

  return (
    <button type="button" onClick={handleGoogleClick}
        className='bg-red-700 text-white p-3
        rounded-lg uppercase hover:opacity-80'>
        Continue with google 
    </button>
  )
}
