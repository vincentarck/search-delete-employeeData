import React, { Fragment, useState, useEffect } from "react";

function TableUser() {
  const [data, setData] = useState();
  const [num, setNum] = useState(1);

  const getUser = (page) => {
    fetch(`https://gorest.co.in/public-api/users?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        console.log(res);
      });
  };
  useEffect(() => {
    getUser(num);
  }, [num]);
  console.log(data ?? data)
  const handleClickPage = (type) => {
    const {
      meta: { pagination },
    } = data;
    if (type === "first") {
      setNum(1);
    } else if (type === "prev") {
      setNum((num) => num - 1);
    } else if (type === "next") {
      setNum((num) => num + 1);
    } else {
      setNum(pagination.pages);
    }
  };
  const handleSearch = (e) => {
    const fetchInterval = () => {
        setTimeout(() => {
            setData(data => ({
                ...data,
                data:data?.data.filter(d => d.email.includes(e.target.value))
            }))
        }, 700)
    }
    fetchInterval()
  }

  const handleDelete = (id) => {
    setData(data => ({
        ...data,
        data:data?.data.filter(d => d.id !== id)
    }))
  }
  return (
    <Fragment>
      <h1 style={{ color: "white" }}>Employee Data</h1>

      <div class="table-wrapper">
        <div className="search">
            <input type="text" placeholder="search by email" onChange={handleSearch}/>
        </div>
        <table className="fl-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Gender</th>
              <th>Email</th>
              <th>Name</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((user,i) => {
                const {email, gender, id, name, status} = user
              return (
                <tr key={i}>
                  <td>{id}</td>
                  <td>{gender}</td>
                  <td>{email}</td>
                  <td>{name}</td>
                  <td>{status}</td>
                  <td className="act-delete" onClick={() => handleDelete(id)}>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button className="btn-page" onClick={() => handleClickPage("first")}>
            First
          </button>
          <button className="btn-page" onClick={() => handleClickPage("prev")}>
            Prev
          </button>
          <button className="btn-page" onClick={() => handleClickPage("next")}>
            Next
          </button>
          <button className="btn-page" onClick={() => handleClickPage("last")}>
            Last
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default TableUser;
