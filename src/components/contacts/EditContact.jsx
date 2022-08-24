import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { contactsActions } from '../../store/contactSlice'
import Flex from '../../UI/ui-positions/Flex'
import {
   showErrorMessage,
   showSuccessMessage,
} from '../../UI/notification/Notification'

const EditContact = ({ hideEditOption }) => {
   const dipatch = useDispatch()
   const { contact } = useSelector((state) => state.contact)
   const firstName = contact?.name?.split(' ')[0]
   const lastName = contact?.name?.split(' ')[1]
   const [edittedContact, setEdittedContact] = useState({
      firstName,
      lastName,
      phone: contact.phone,
   })

   const inpuChangeHandler = ({ target: { value, name } }) => {
      setEdittedContact({
         ...edittedContact,
         [name]: value,
      })
   }
   const validateEditForm = () => {
      return edittedContact.firstName !== '' && edittedContact.phone !== ''
   }
   const editContactHandler = () => {
      if (validateEditForm()) {
         dipatch(
            contactsActions.editContact({
               ...contact,
               name: `${edittedContact.firstName} ${edittedContact.lastName}`,
               phone: edittedContact.phone,
            })
         )
         showSuccessMessage({
            title: 'Success',
            message: 'Successfully updated',
         })
         hideEditOption()
         return
      }
      showErrorMessage({ title: 'Warning', message: 'The field is required' })
   }

   return (
      <OuterWrapper>
         <Wrapper>
            <Label>First name</Label>
            <InputEdit
               name="firstName"
               onChange={inpuChangeHandler}
               value={edittedContact.firstName}
            />
         </Wrapper>
         <Wrapper>
            <Label>Last name</Label>
            <InputEdit
               name="lastName"
               onChange={inpuChangeHandler}
               value={edittedContact.lastName}
            />
         </Wrapper>
         <Wrapper>
            <Label>Number</Label>
            <InputEdit
               name="phone"
               onChange={inpuChangeHandler}
               value={edittedContact.phone}
            />
         </Wrapper>
         <Flex width="100%">
            <Button onClick={editContactHandler}>Save</Button>
         </Flex>
      </OuterWrapper>
   )
}

const OuterWrapper = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
`

const Wrapper = styled.div`
   width: 100%;
   padding: 0.5rem;
   // border-bottom: 0.1px solid #313131;
   display: flex;
   flex-direction: column;
   gap: 5px;
`
const Label = styled.label`
   color: #2980b9;
`
const InputEdit = styled.input`
   outline: none;
   border: none;
   background-color: transparent;
   color: blue;
   font-size: 17px;
   border-radius: 4px;
   transition: all 0.5s;
   letter-spacing: 1px;
   padding: 0.4rem;
   border: 1px solid #2980b9;
   ::placeholder {
      color: blue;
   }
`
const Button = styled.button`
   width: 100%;
   border: none;
   background-color: #2980b9;
   padding: 0.5em;
   margin: 10px 0 10px 0;
   font-size: 15px;
   box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
   transition: all 0.2s;
   text-transform: uppercase;
   color: white;
   border-radius: 2px;
   :hover {
      background-color: #8674e12f;
   }
   :active {
      background-color: #8774e1;
      color: white;
   }
   cursor: pointer;
`

export default EditContact
