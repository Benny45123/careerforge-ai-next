

import NavBar from '@/app/components/NavBar'
import Layout from './dashboard/layout'

import Link from 'next/link'

export default function Home({children}) {
  return (
 
    <>
    <Link href="/auth">Please Signup to continue</Link>
    </>
  )

}
