import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { ApolloClient, gql, InMemoryCache, } from '@apollo/client';
import { useRouter } from 'next/router';

const UpdateTask = (data) => {
    const Router = useRouter()
    const [showEdit, setShowEdit] = useState(false);

    const [_title, setTitle] = useState(data.tasks.title);
    const [_date, setDate] = useState(data.tasks.date);
    const [_deskripsi, setDeskripsi] = useState(data.tasks.deskripsi);

    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache()
    })

    async function submitEdit(e) {
        e.preventDefault()
        try {
            await client.mutate({
                mutation: gql`
                    mutation{
                        updateMemo(id:${data.id}, data:{
                        title: "${_title}",
                        date: "${_date}",
                        deskripsi: "${_deskripsi}"
                        })
                        {
                        data{
                            id
                            attributes{
                            title
                            date
                            deskripsi
                            }
                        }
                    }
                }`
            })
            alert("Update data sukses")
            setShowEdit(false)
            Router.replace('/')
        } catch (e) {
            console.log({ message: e.message })
        }
    }

    return (
        <div>
            <i onClick={(e) => setShowEdit(true)} data-bs-toggle="modal" data-bs-target="#form" >
                <FontAwesomeIcon icon={faEdit} />
            </i>
            {showEdit && (
                <form className="modal" id="form" onSubmit={submitEdit}>

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Memo</h5>
                            <button onClick={() => setShowEdit(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Memo Title</p>
                            <input type="text" className="form-control" name id="textInput" required="required" value={_title} onChange={(e) => setTitle(e.target.value)} />
                            <div id="msg" />
                            <br />
                            <p>Date</p>
                            <input type="date" className="form-control" name id="dateInput" required="required" value={_date} onChange={(e) => setDate(e.target.value)} />
                            <br />
                            <p>Description</p>
                            <textarea name className="form-control" id="textarea" cols={30} rows={5} value={_deskripsi} onChange={(e) => setDeskripsi(e.target.value)} />
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setShowEdit(false)} className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="submit" id="add" className="btn btn-primary">Edit</button>
                        </div>
                    </div>

                </form>
            )}
        </div>
    );
}

export default UpdateTask;