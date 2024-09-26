import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Form from './Form'

const FormData = () => {

    const [srch,setSrch] = useState("")
    const [list,setList] = useState([])  
    const [currentPage,setCurrentPage] = useState(1);
    const navigate = useNavigate();

    useEffect(()=>{
        getData()
    },[])

    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = list.slice(indexOfFirstItem,indexOfLastItem);
    const totalPage = Math.ceil(list.length/itemsPerPage);


    const getData = ()=>{
        fetch("http://localhost:3000/users").then((result)=>{
            result.json().then((res)=>{
              setList(res)
            })
          })
    }

    const deleteData = (id)=>{
        fetch(`http://localhost:3000/users/${id}`,{
            method:"DELETE"
        }).then(()=>getData())
    }

    const [symbol,setSymbol] = useState("");
    let sortValue = [];

    const sortBy = (field)=>{    
        if(field == 'name'){
          if(symbol == "" || symbol == "^"){
            sortValue = list.sort((current,previous)=> previous.userName.localeCompare(current.userName) )
            setSymbol("v");        
          }else{
            sortValue = list.sort((current,previous)=> current.userName.localeCompare(previous.userName) )          
            setSymbol("^");        
          }
        }else if(field == "email"){
          if(symbol == "" || symbol == "^"){
            sortValue = list.sort((current,previous)=> previous.email.localeCompare(current.email) )
            setSymbol("v");        
          }else{
            sortValue = list.sort((current,previous)=> current.email.localeCompare(previous.email) )          
            setSymbol("^");        
          }
        }
        setList(sortValue)
      } 

      const edtData = (id)=>{
        navigate(`/editData/${id}`)
      }

  return (
    <div>
        <Container>
            <div className="row">
                <div className="col-12">
                    <div className="form-group">
                        <input type="text" onChange={(e)=>setSrch(e.target.value)} className='mb-2 form-control' />
                    </div>  
                </div>
                <div className="col-12">
                <Table striped bordered hover size="sm" variant='dark'>
                    <thead>
                        <tr>
                        <th><button className='btn btn-success' onClick={()=>sortBy('name')} >Name {symbol}</button></th>
                        <th><button className='btn btn-success' onClick={()=>sortBy('email')}>Email {symbol}</button></th>
                          <th>Mobile No.</th>
                          <th>Gender</th>
                          <th>City</th>
                          <th>Hobby</th>
                          <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { 
                          currentItems.filter((val)=>{
                             if(srch == "") return val;
                             else if(val.userName.toLocaleLowerCase().match(srch.toLocaleLowerCase())) return val; 
                             else if(val.email.toLocaleLowerCase().match(srch.toLocaleLowerCase())) return val; 
                          }).
                          map((val,index)=>{
                            return(
                            <tr key={index} >
                              <td>{val.userName}</td>
                              <td>{val.email}</td>
                              <td>{val.mobile}</td>
                              <td>{val.gender}</td>
                              <td>{val.city}</td>
                              <td>{val.hobby.toString('')}</td>
                              <td>
                                <Button variant="outline-danger py-0 me-1" onClick={()=>{deleteData(val.id)}} >Delete</Button>
                                <Button variant="outline-warning py-0" onClick={()=>{edtData(val.id)}} >EDIT</Button>
                              </td>
                            </tr>
                            )
                          })
                        }
                        <tr>
                          <td colSpan={7}>
                            {
                              currentPage > 1?
                              <button onClick={()=>setCurrentPage(currentPage - 1)} >Prev</button>:
                              null
                            }
                            {
                              [...Array(totalPage)].map((_, index)=>{
                                return(
                                <button key={index} onClick={() => setCurrentPage(index + 1)}>
                                  {index + 1}
                                </button>
                                )
                             })
                            }
                            {
                              currentPage < totalPage?
                              <button onClick={()=>setCurrentPage(currentPage + 1)} >Next</button>:
                              null
                            }
                          </td>  
                        </tr>
                    </tbody>    
                  </Table>
                </div>
            </div>
        </Container>
    </div>
  )
}

export default FormData
