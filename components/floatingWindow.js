import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApolloClient, gql, InMemoryCache, } from '@apollo/client';
import { useRouter } from 'next/router';

const FloatingWindow = () => {
  const Router = useRouter()
  const [showModal, setShowModal] = useState(false);

  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
  })

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const clearInput = () => {
    setTitle('')
    setDate('')
    setDeskripsi('')
  }

  async function submitEdit(e) {
    e.preventDefault()
    try {
      await client.mutate({
        mutation: gql`
            mutation{
                createMemo(data:{
                    title: "${title}",
                    date: "${date}",
                    deskripsi: "${deskripsi}",
                })
                {
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
      alert("Penambahan data sukses")
      clearInput()
      setShowModal(false)
      Router.replace('/')
    } catch (e) {
      console.log({ message: e.message });
    }

  }

  return (
    <div>
      <div onClick={() => setShowModal(true)} className="btn" id="addNew" data-bs-toggle="modal" data-bs-target="#form">
        <span>Add New Memo</span>
        <FontAwesomeIcon icon={faPlus} />
      </div>
      {showModal && (
        <form className="modal" id="form" onSubmit={submitEdit}>

          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New Memo</h5>
              <button onClick={() => setShowModal(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Memo Title</p>
              <input type="text" className="form-control" name id="textInput" required="required" value={title} onChange={(e) => setTitle(e.target.value)} />
              <div id="msg" />
              <br />
              <p>Date</p>
              <input type="date" className="form-control" name id="dateInput" required="required" value={date} onChange={(e) => setDate(e.target.value)} />
              <br />
              <p>Description</p>
              <textarea name className="form-control" id="textarea" cols={30} rows={5} value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
            </div>
            <div className="modal-footer">
              <button onClick={() => setShowModal(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="submit" id="add" className="btn btn-primary">Add</button>
            </div>
          </div>

        </form>
      )}
    </div>
  );
}

export default FloatingWindow;