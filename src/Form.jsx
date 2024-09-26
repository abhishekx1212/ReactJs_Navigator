import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Form = (props) => {
  
  const navigate = useNavigate();
  // const location = useLocation();
  // const { user } = location.state;
  
  const [studnt,setStudnt] = useState({})  
  const [list,setList] = useState([])  
  const [ind, setInd] = useState(-1)
  const [err,setErr] = useState({})
  const [hoby,setHoby] = useState([])

  function handleInput(val){        
    let {name,value} = val.target;
    if(name == 'hobby'){
      let tempArr = [...hoby];
      if(val.target.checked){
        tempArr.push(value)
      }else{
        let arrInd = hoby.findIndex((v)=> v == value)
        tempArr.splice(arrInd,1)
      }
      setHoby(tempArr)
      value = [...tempArr]
    }
    setStudnt({...studnt,[name]:value}) 
  }

  function handleValidation(){
   let tempError = {};
   if(!studnt.userName) tempError.userName = "User Name required"
   if(!studnt.email) tempError.email = "email required"
   else if(!/\S+@\S+\.\S+/.test(studnt.email)) tempError.email = "Invalid Email"
   if(!studnt.mobile) tempError.mobile = "Mobile required"
   if(!studnt.gender) tempError.gender = "gender required"
   if(!studnt.city) tempError.city = "city required"
   setErr(tempError)
   return Object.keys(tempError).length != 0 
  }

  function submtForm(){
    if (handleValidation()) return;   
    let newVal = [...list,studnt];
    setList(newVal);
    fetch("http://localhost:3000/users",{
      method:"POST",
      body:JSON.stringify(studnt)})
    .then(()=>{      
      navigate("/userFormData")        
    })      
    setStudnt({})  
    setErr({}) 
    setHoby([])
  }  

  // function submtForm(){
  //   if (handleValidation()) return;
  //   if(ind == -1){
  //     let newVal = [...list,studnt]
  //     setList(newVal)
  //     fetch("http://localhost:3000/users",{
  //       method:"POST",
  //       body:JSON.stringify(studnt)
  //     })      
  //     // localStorage.setItem('list', JSON.stringify(newVal)) //for storing in localStorage
  //   }else{      
  //     let newVal = [...list];
  //     newVal[ind] = {...studnt};      
  //     setList(newVal)
  //     // localStorage.setItem('list', JSON.stringify(newVal)) //for storing in localStorage
  //     setInd(-1)
  //   }
  //   setStudnt({})  
  //   setErr({}) 
  //   setHoby([])
  // }
 
  // function delFun(i){    
  //   list.splice(i,1)
  //   let newVal = [...list] 
  //   localStorage.setItem('list', JSON.stringify(newVal))
  //   setList(newVal)
  // }

  // function edt(i){
  //   setStudnt(list[i]);
  //   setInd(i)
  //   setHoby(list[i].hobby)
  // }

  return (
    <div>
      <Container>
            <Row style={{justifyContent:"center"}} className='mb-4' >
                <Col lg={4} >
                  <div className="form-container">
                    <form method = 'post' className="form" onSubmit={(e)=>{e.preventDefault()}}>
                      <h3>User Form</h3>
                      <div className="form-group" style={{gap:"10px"}} >
                        {err.userName? <label>{err.userName}</label>:null }<input type="text" name='userName' value={studnt.userName?studnt.userName:""} onChange={handleInput}  />
                        
                        {err.email? <label>{err.email}</label>:null }<input type="text" name='email' value={studnt.email?studnt.email:""} onChange={handleInput}  />
                        
                        {err.mobile? <span>{err.mobile}</span>:null }<input type="text" name='mobile' value={studnt.mobile?studnt.mobile:""} onChange={handleInput}  />
                        
                        {err.city? <span>{err.city}</span>:null }<select name="city" id="" className='form-control' value={studnt.city || ""} onChange={(e) => handleInput(e)} >
                          <option disabled value="">Select City</option>
                          <option value="surat">Surat</option>
                          <option value="Baroda">Baroda</option>
                          <option value="Vapi">Vapi</option>
                        </select>
                      </div>
                      <div className="form-group">
                        {err.gender? <span>{err.gender}</span>:null }
                      </div>
                      <div className="form-group-user">
                        <input type="radio" name="gender" checked={studnt.gender == 'male'} value={"male"} className='me-2' onChange={handleInput} />Male 
                      </div>
                      <div className="form-group-user">
                        <input type="radio" name="gender" checked={studnt.gender == 'female'} value={"female"} className='me-2' onChange={handleInput} />Female 
                      </div>
                      <div className="form-group-user">
                        <input type="checkbox" className='me-2' name="hobby" id="" value={"cricket"} onChange={handleInput} checked={hoby.includes('cricket')} /> Cricket
                      </div>
                      <div className="form-group-user">
                        <input type="checkbox" className='me-2' name="hobby" id="" value={"football"} onChange={handleInput} checked={hoby.includes('football')} />Football
                      </div>
                      <div className="form-group-user">
                        <input type="checkbox" className='me-2' name="hobby" id="" value={"hockey"} onChange={handleInput} checked={hoby.includes('hockey')} />Hockey 
                      </div>  
                      <div className="form-group">  
                        <button type='submit' onClick={submtForm} >Submit</button>
                      </div>
                    </form>
                  </div>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Form
