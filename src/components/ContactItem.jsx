import React from 'react'

function ContactItem({data :{id, name, lastName, email, phone}, deleteHandler}) {
  return (
    
        <li key={id}>
                <p>
                    {name} {lastName}
                </p>
                <p>{email}</p>
                <p>{phone}</p>

                <button onClick={() => deleteHandler(id)}>حذف</button>
                </li>
    
  )
}

export default ContactItem