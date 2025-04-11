import { Link } from 'react-router-dom'

const NoPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-center px-4">
      <h1 className="text-6xl font-bold text-pink-600">Oops...</h1>
      <p className="text-2xl mt-4">We cannot find her! Maybe she got married! ♥</p>
      <p className="text-md mt-2 text-gray-600">
        Don’t worry, we still have the solution for you in <span className="text-pink-500 font-semibold">Escorts</span>.<br />
        Or try to look for another one!
      </p>
      <button
        className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full shadow-lg"
        onClick={() => window.location.href = '/'}
      >
        Go Home
      </button>
    </div>
  )
}
export default NoPage;