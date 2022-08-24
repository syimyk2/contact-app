import React, { useState } from 'react'
import styled from 'styled-components'
import { IoMdContact } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import Flex from '../../UI/ui-positions/Flex'
import { contactsActions } from '../../store/contactSlice'
import DeleteModal from './DeleteModal'

const Contact = ({ contact, address, onClick, id }) => {
   const dispatch = useDispatch()
   const [showDeleteModal, setShowDeleteModal] = useState(false)

   const deleteContactHandler = (e) => {
      e.stopPropagation()
      dispatch(contactsActions.deleteContact(id))
   }
   const showModalHandler = (e) => {
      e.stopPropagation()
      setShowDeleteModal(true)
   }
   const hideModalHandler = (e) => {
      e.stopPropagation()
      setShowDeleteModal(false)
   }
   return (
      <ContactStyled onClick={onClick}>
         <ContactTitle>
            <IoMdContact fontSize={30} /> &nbsp;&nbsp;
            <Flex capitalize direction="column" gap="3px">
               {contact}
               <Span>{address}</Span>
            </Flex>
         </ContactTitle>
         <DeleteIcon onClick={(e) => showModalHandler(e)} />
         <DeleteModal
            isVisible={showDeleteModal}
            onClose={hideModalHandler}
            onClick={(e) => deleteContactHandler(e)}
         />
      </ContactStyled>
   )
}
const Span = styled.span`
   color: white;
   font-size: 14px;
`
const DeleteIcon = styled(MdDelete)`
   color: #d66d75;
   font-size: 30px;
   z-index: 10;
   :hover {
      color: tomato;
   }
   :active {
      color: red;
   }
`
const ContactStyled = styled.div`
   // width: 100%;
   padding: 1rem;
   background: #1c92d2;
   display: flex;
   align-items: center;
   justify-content: space-between;
   margin-bottom: 1px;
   box-shadow: 1px 1px 3px black;
   cursor: pointer;
   transition: all 0.2s;
   :hover {
      background-color: #6dd5fa;
   }
   :active {
      background-color: #6dd5fa;
   }
`
const ContactTitle = styled.h3`
   width: 100%;
   color: white;
   font-weight: 300;
   letter-spacing: 0.5px;
   display: flex;
   align-items: center;
`

export default Contact
