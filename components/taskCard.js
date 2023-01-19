import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { ApolloClient, gql, InMemoryCache, } from '@apollo/client';
import UpdateTask from './updateTask';
import TaskInfo from './taskInfo';


const TaskCard = ({ data }) => {
    const router = useRouter()

    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache()
    })

    async function hapusMemo(id, title) {
        try {
            await client.mutate({
                mutation: gql`
                mutation{
                    deleteMemo(id:${id})
                    {
                        data {
                            id
                        }
                    }
                }`
            })

            alert(`Memo ${title} telah terhapus`)
        } catch (error) {
            console.log({ message: error.message });
        }
        router.push('/')
    }
    
    return (
        <>
            {data.map((memos, idx) => (
                <div className='tasks' key={idx}>
                    <span className="fw-bold">{memos.attributes.title}</span>
                    <span className="small text-secondary">{memos.attributes.date}</span>
                    <p>{memos.attributes.deskripsi}</p>
                    <span className="options">
                        <TaskInfo id={memos.id} info={memos.attributes}/>
                        <UpdateTask id={memos.id} tasks={memos.attributes} />
                        <i onClick={(e) => hapusMemo(memos.id, memos.attributes.title)} className="fas fa-trash-alt">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </i>
                    </span>
                </div>
            )
            )}
        </>
    )
};

export default TaskCard