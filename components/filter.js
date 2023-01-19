import React, { useState } from "react";
import Router, { useRouter } from "next/router";

export default function Filter() {
    const [memo, setMemo] = useState(memos)
    const [cari, setCari] = useState("");
    // function find(e) {
    //   setCari(e.target.value);
    // }
    function submitFilter(e) {
        e.preventDefault();
        Router.push({
            pathname: "/",
            query: { 'title': cari }
        })
    }
        return (
            <>
                <form className="d-flex justify-content-center h-100 mb-5" onSubmit={test}>
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search our dish"
                            value={title}
                            onChange={(e) => setTitle(title => e.target.value)}
                        />
                        <div className="input-group-append">
                            <button className="btn btn-dark" id="search" type="button">
                                <SearchOutline style={{ fontSize: "1em" }} color="#fff" />
                            </button>
                        </div>
                    </div>
                </form>

            </>
        )
}