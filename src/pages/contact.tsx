import { useEffect } from "react"
import Layout from "../components/layout/Layout"
import useFetchGet from "../hooks/useFetch"

const PageContact = () => {

  const {isLoading, apiData: data, serverError } = useFetchGet('/api/post/getAllPosts')

  console.log(data)

  return (
    <h1>Contact</h1>
  )
}

export default PageContact