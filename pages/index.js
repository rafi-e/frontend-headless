import FloatingWindow from '@/components/floatingWindow';
import React, { useState } from 'react';
import TaskCard from '@/components/taskCard';
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import Router from 'next/router';

export default function Home({ memos }) {
  const [memo, setMemo] = useState(memos)
  const [cari, setCari] = useState("");
  function submitFilter(e) {
    e.preventDefault();
    Router.push({
        pathname: "/",
        query: { 'title': cari }
    })
}

  return (
    <>
      <div className="app">
        <h4 className="mb-3">Memo App</h4>
        <FloatingWindow />
        <h5 className="text-center my-3">Notes</h5>
        <form className='d-flex my-3' role="search" onSubmit={submitFilter}>
          <input onChange={(e) => setCari(cari => e.target.value)} className="form-control me-2" type="search" placeholder='Search' aria-label='Search' />
          <button className='btn btn-outline-success' type='submit'>Search</button>
        </form>
        <TaskCard data={memos.data} />
      </div>
    </>
  );
}

export async function getServerSideProps({ query }) {
  let title = query.title
  { typeof title === 'string' ? title = title : title = "" }
  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
  })

  const { data } = await client.query({
    query: gql`
    query getAllMemo{
      memos(filters:{title:{containsi:"${title}"}}){
          data {
              id
              attributes {
                  title
                  date
                  deskripsi
              }
          }
      }
  }`
  })
  return { props: { memos: data.memos } }
}