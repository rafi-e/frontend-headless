import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { ApolloClient, gql, InMemoryCache, } from '@apollo/client';
import { useRouter } from 'next/router';

const TaskInfo = (data) => {
    const Router = useRouter()
    const [showTask, setShowTask] = useState(false);

    const _title = useState(data.info.title);
    const _date = useState(data.info.date);
    const _deskripsi= useState(data.info.deskripsi);
    // const { id, title, date, deskripsi } = Router.query;

    const client = new ApolloClient({
        uri: 'http://localhost:1337/graphql',
        cache: new InMemoryCache()
    })

    return (
        <div>
            <i onClick={(e) => setShowTask(true)} data-bs-toggle="modal" data-bs-target="#form" >
                <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </i>
            {showTask && (
                <form className="modal" id="form">

                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Memo</h5>
                            <button onClick={() => setShowTask(false)} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <span className='fw-bold'>Memo Title</span>
                            <br />
                            <span className='small text-secondary'>{_title}</span>
                            <br />
                            <span className='fw-bold'>Date</span>
                            <br />
                            <span className='small text-secondary'>{_date}</span>
                            <br />
                            <span className='fw-bold'>Description</span>
                            <br />
                            <span className='small text-secondary'>{_deskripsi}</span>
                        </div>
                        <div className="modal-footer">
                            <button onClick={() => setShowTask(false)} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            {/* <button type="submit" id="add" className="btn btn-primary">Add</button> */}
                        </div>
                    </div>

                </form>
            )}
        </div>
    );
}

export default TaskInfo;