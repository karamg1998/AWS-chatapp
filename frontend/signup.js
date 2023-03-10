let signup=document.getElementById('signup');
signup.addEventListener('click',async (e)=>{
    e.preventDefault();
    let name=document.getElementById('name').value;
    let email=document.getElementById('email').value;
    let phone=document.getElementById('phone').value;
    let pass=document.getElementById('password').value;

    if(name=='')
   {
      let n='*name cannot empty';
      popup(n);
      return;
   }
   if(email=='')
   {
    let e='*email cannot empty';
    popup(e);
    return;
   }
   if(phone=='')
   {
    let e='*phone cannot empty';
    popup(e);
    return;
   }
   if(pass=='')
   {
    let p='*password cannot empty';
    popup(p);
    return;
   }

    let obj={name,email,phone,pass};
    try{
        await axios.post('http://13.232.243.73:5000/signup',obj)
    .then(res=>{
        console.log(res);
        popup(res.data.message);
    })
    }
    catch(err)
        {
            console.log(err);
            if(err.response.data.original.code==='ER_DUP_ENTRY')
            {
                popup('user already present');
            }
        }
    })

function popup(data)
{
  let element=document.querySelector('.popup');
      let n_element=document.createElement('div');
      n_element.className='toast';
      n_element.innerText=data;
      element.appendChild(n_element);
      setTimeout(()=> {
        n_element.remove();
        },2000); 
}