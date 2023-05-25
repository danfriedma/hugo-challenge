import React, {useState} from "react"
import { GetServerSideProps } from "next"
import Layout from "../../components/Layout"
import Form from '../../components/Form'
import { useRouter } from 'next/router'

const getProtocol = () => {
  const isProd = process.env.VERCEL_ENV === "production";
  return isProd ? "https://" : "http://"
}

export const getServerSideProps: GetServerSideProps = async ({ params, query, req }) => {
  const route = `${getProtocol()+req.headers.host}/api/application/${query.id}`
  const response = await fetch(route)
  const application = await response.json()

  // format datetime for date input
  application.dateOfBirth = application.dateOfBirth.substr(0, 10)
  application.people = application.people
    .map(person => ({...person, dateOfBirth: person.dateOfBirth.substr(0, 10)}))

  return {
    props: {
      application: application
    }
  }
}

const displayApplicationData = (obj) => {
  return (
    <div className="border">
      {
        Object.keys(obj)
          .filter(key => (key !== 'id' && !key.includes('Id')))
          .map(key => {
            return (obj[key] instanceof Object) ?
              (<div key={'parent -'+key} className="border">
                <h3>{key}</h3>
                {displayApplicationData(obj[key])}
              </div>) :
              (<p key={key}>{key.replace(/([A-Z])/g, " $1").toUpperCase()}: {obj[key]}</p>)
          })
      }
    </div>)
}

const getQuote = async (data) => {
  const response = await fetch(`/api/application/validate`,
  {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
  const responseBody = await response.json()

  return responseBody.price
}

const onSubmit = async (data) => {
  const response = await fetch('/api/application/update',
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
  const responseBody = await response.json()
}

const Application: React.FC<Props> = ({application}) => {
  const [editing, setEditing] = useState(false)
  const [price, setPrice] = useState(undefined)
  const router = useRouter()

  return (
    <Layout>
      <div className="page">
        <h1>Your Application</h1>

        {
          editing ?
            <Form
              defaultData={application}
              onSubmit={async (data) => {
                await onSubmit(data)
                // todo: update application directly without refreshing page
                router.reload()
              }}
              formSubmitText={"Update"}
            /> :
            (<div>
              { displayApplicationData(application) }
              <button onClick={() => {setEditing(!editing)}}>Edit</button>
            </div>)
        }

        <button onClick={
          async () => {
            const quote = await getQuote(application)
            setPrice(quote)
          }}>
          Get Quote
        </button>

        { price && <h1 className="quote">Price: ${price} / month</h1> }

      </div>
    </Layout>
  )
}

export default Application
