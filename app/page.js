

import NavBar from '@/app/components/NavBar'
import Layout from './dashboard/layout'



export default function Home({children}) {
  return (
 
    <Layout>
      <div className="p-10 bg-gray-200">
        <h1 className="text-3xl font-bold mb-5">Welcome to your Dashboard!</h1>
        <p className="text-gray-600">Use the sidebar to navigate Cover Letters, Resumes, Jobs, and Settings.</p>
      </div>
    </Layout>
  )

}
