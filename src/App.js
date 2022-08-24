import Contacts from './components/contacts/ContactList'
import Header from './layout/Header'
import Notification from './UI/notification/Notification'

function App() {
   return (
      <div className="App">
         <Header />
         <Contacts />
         <Notification />
      </div>
   )
}

export default App
