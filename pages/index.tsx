'use client'

import React from "react"
import Layout from "../components/Layout"
import Form from '../components/Form'
import { useRouter } from 'next/router'

const Home: React.FC<Props> = (props) => {
  const router = useRouter()

  const onSubmit = async (data) => {
    const response = await fetch('api/application/create',
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      })
    const responseBody = await response.json()

    // navigate to application page
    router.push('/' + responseBody.resume)
  }

  return (
    <Layout>
      <div className="page">
        <h1>Application</h1>
        <main>
          <Form onSubmit={onSubmit} formSubmitText={"Submit"} />
        </main>
      </div>
    </Layout>
  )
}

export default Home
