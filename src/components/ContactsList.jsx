 
function ContactsList({contacts}) {
  return (
    <div>
        <h3> contacts list</h3>
        {contacts.length ? (  <ul>
         {contacts.map((contact) => (
            <li>
                <p>
                    {contact.name} {contact.lastName}
                </p>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>

                <p><button>حذف</button></p>
                </li>
         ))}
        </ul>) : <p> No Contacts yet!!</p>}
      
    </div>
  )
}

export default ContactsList