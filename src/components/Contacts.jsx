import { useState } from "react"
import inputs from "../constants/inputs";
import styles from "./Contacts.module.css"


function Contacts() {
 const [contacts, setContacts] = useState([
    { id: "1", name: "محسن", lastName: "جمالپور", email: "mohsen@gmail.com", job: "پرستار", phone: "09376674097" },
    { id: "2", name: "علی", lastName: "احمدی", email: "ali@gmail.com", job: "برنامه‌نویس", phone: "09123456789" },
    { id: "3", name: "رضا", lastName: "کریمی", email: "reza@gmail.com", job: "معلم", phone: "09223334455" },
    { id: "4", name: "اشکان", lastName: "رضایی", email: "ash@gmail.com", job: "معلم", phone: "09223337855" },
    { id: "5", name: "احمد", lastName: "پناهی", email: "ahmad@gmail.com", job: "پزشک", phone: "09223335855" },
    { id: "6", name: "محمد", lastName: "یوسفی", email: "moha@gmail.com", job: "مهندس", phone: "09223334455" },
  ]);
  const [contact, setContact] = useState({
    id:"",
    name:"",
    lastName:"",
    email:"",
    phone:"",
    job:""
  })
const[search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
   const [showDeleteModal, setShowDeleteModal] = useState(false);
  const[alert, setAlert] = useState("");
   const [activeId, setActiveId] = useState(null);
   const [editingContact, setEditingContact] = useState(null)
     const [contactToDelete, setContactToDelete] = useState(null);
   



const filteredContacts = contacts.filter((contact) => contact.name.includes(search)
 || contact.lastName.toLowerCase().includes(search.toLowerCase()) || contact.email.toLowerCase().includes(search.toLowerCase()) )

//حذف کردن//
  const deleteHandler = () => {
    const newContacts = contacts.filter((contact) => contact.id !== contactToDelete.id);
    setContacts(newContacts);
    setShowDeleteModal(false);
    setContactToDelete(null);
  }

const editHandle = (contactToEdit) => {
  setContact({...contactToEdit});
  setEditingContact(contactToEdit)
  setShowModal(true)
  setActiveId(null)
}

const addHandler = () => {
    setContact({
      id: Date.now().toString(), 
      name: "",
      lastName: "",
      email: "",
      phone: "",
      job: ""
    });
    setEditingContact(null); 
    setShowModal(true); 
  }

const saveHandler = () => {
  if(!contact.name || !contact.lastName || !contact.email || !contact.phone || !contact.job){
    setAlert("لطفا  اطلاعات را  کامل پر کنید")
    return
  }
  setAlert("");
  if(editingContact){
    setContacts(contacts.map(c => (c.id === editingContact.id ? contact : c)))

  } else{

    setContacts((contacts) => [...contacts, contact])
  }
setContact({
    name:"",
    lastName:"",
    email:"",
    phone:"",
    job:""
  })
  setShowModal(false)
  setEditingContact(null)
}
const changeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value;
    setContact((contact) => ({...contact, [name]:value}))

}
const closeModal = () => {
    setShowModal(false);
    setContact({
      id: "",
      name: "",
      lastName: "",
      email: "",
      phone: "",
      job: ""
    });
    setEditingContact(null);
    setAlert("");
  }


  const openDeleteModal = (contact) => {
    setContactToDelete(contact);
    setShowDeleteModal(true);
    setActiveId(null);
  }
    const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setContactToDelete(null);
  }



  return (
    <>
   <div className={styles.container}>
       <div>
        {alert && <p className={styles.alert}>{alert}</p>}
      </div>
      <div className={styles.header}>
          <div className={styles.search}>
            <label htmlFor="search"> جستجوی برای مخاطبین :</label>
            <input type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="نام، نام خانوادگی یا ایمیل" />
        </div>
        <div className={styles.addbtn}>
            <button   className={styles.selectAllCheckbox} >✔</button>
            <button  onClick={addHandler}>+</button>
            
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>عملیات</th>
            </tr>
          </thead>
            {filteredContacts.length ? (
                filteredContacts.map((contact) => (
                <tr className={styles.tableTr} key={contact.id}>
                    <td>{contact.name} {contact.lastName}</td>
                    <td>{contact.email}</td>
                    <button  className={styles.tableBtn} onClick={() => setActiveId(activeId === contact.id ? null : contact.id)}>...</button>
                    {activeId === contact.id && ( 
                    <div className={styles.actionMenu}>
                      <button className={styles.deleteBtn} onClick={() => openDeleteModal(contact)}>حذف</button>
                      <button onClick={() => editHandle(contact)} className={styles.editBtn}>ویرایش</button>

                    </div>)
                    }
                </tr>
            )) 
          ) : (
            <tr>
                <td colSpan="3"  className={styles.noResult}>
                  مخاطبی یافت نشد
                </td>
              </tr>
            )}
        </table>
              </div>
        
{showModal &&
<div className={styles.modal}>
<div className={styles.modalContent}>
    <h3> {editingContact ? "ویرایش مخاطب" : "افزودن مخاطب"} </h3>
   {inputs.map((input, index) => (
     <input
     key={index}
     placeholder={input.placeholder}
     value={contact[input.name]} 
    name={input.name}
    onChange={changeHandler}
    className={styles.formInput}
    />
   ))}
   <div className={styles.modalButtons}>
    <button onClick={saveHandler} className={styles.saveBtn}>ذخیره</button>
    <button onClick={closeModal} className={styles.cancelBtn}>لغو</button>

   </div>
    </div>
    </div>
    }

 {showDeleteModal && contactToDelete && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <div className={styles.deleteModal}>
                <h3>تأیید حذف</h3>
                <p className={styles.deleteMessage}>
                  شما در حال حذف مخاطب <strong>{contactToDelete.name} {contactToDelete.lastName}</strong> هستید.
                  <br />
                  آیا مطمئن هستید؟
                </p>
                <div className={styles.modalButtons}>
                  <button onClick={deleteHandler} className={styles.confirmDeleteBtn}>
                    حذف
                  </button>
                  <button onClick={closeDeleteModal} className={styles.cancelBtn}>
                    لغو
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

   </div>
    </>
  )
}

export default Contacts  